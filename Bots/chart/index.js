const env = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient(env['KAKAO_CLIENT_KEY'], 'https://developers.kakao.com');
Kakao.login(env['KAKAO_ID'], env['KAKAO_PASSWORD']); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  let [command, ticker, day] = msg.split(' ');

  if (ticker && command === '차트') {
    if (day === undefined) {
      day = '1일';
    } else if (!['1일', '1주', '1개월', '3개월', '1년'].includes(day)) {
      return;
    }
    ticker = checkTicker(ticker);
    const url = 'https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=' + ticker + '시세' + day;
    const data = org.jsoup.Jsoup.connect(url).get();
    let image = changeUrl(data.select('.img_graph').attr('src'), day);
    let price, ratio, highPrice, lowPrice, tradingVolumn, currency;
    if (image) {
      price = data.select('.currency_value').text();
      ratio = data.select('.rate_value').text();
      highPrice = data.select('dd.stock_up').text();
      lowPrice = data.select('dd.stock_down').text();
      tradingVolumn = data.select('.list_stock').text().split('거래대금')[2];
    } else {
      image = changeUrl(data.select('div.img_stock > a > img.thumb_img').attr('src'), day);
      if (!image) {
        return;
      }
      price = data.select('div.info_current > span.num_stock').text();
      ratio = data.select('div.info_current > span.num_rate').text();
      ratio = ratio.includes('하락') ? ratio.replace('하락', '-') : ratio.replace('상승', '+');
      ratio = ratio.replace('보합', '');
      currency = data.select('span.txt_currency').text();

      const temp = data.select('dl.dl_comm > dd.cont').text();
      highPrice = temp.split(' ')[1];
      lowPrice = temp.split(' ')[2];
      tradingVolumn = temp.split(' ')[5];
    }
    if (!currency) currency = '원';
    if (price.includes('원')) price = price.replace('원', '');
    try {
      Kakao.sendLink(room, {
        template_id: 85798,
        template_args: {
          image: image,
          ticker: ticker,
          day: day,
          price: price,
          ratio: ratio,
          highPrice: highPrice,
          lowPrice: lowPrice,
          tradingVolumn: tradingVolumn,
          currency: currency,
        },
      }).then((res) => {
        if (res.status === 400) {
          replier.reply('카링 호출량을 초과하였습니다. 다른 명령어를 사용해주세요 🙏');
        }
      });
    } catch (error) {
      replier.reply('차트 호출 실패. 다시 시도해주세요 😱');
    }
  }
}

function checkTicker(ticker) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  if (Object.keys(dict_data).indexOf(ticker) > -1) {
    ticker = dict_data[ticker];
  }
  return ticker;
}

function changeUrl(url, day) {
  switch (day) {
    case '1일':
      break;
    case '1주':
      url = url.replace('/d/', '/w/');
      break;
    case '1개월':
      url = url.replace('/d/', '/m/');
      break;
    case '3개월':
      url = url.replace('/d/', '/m3/');
      break;
    case '1년':
      url = url.replace('/d/', '/y/');
      break;
  }
  return url;
}
