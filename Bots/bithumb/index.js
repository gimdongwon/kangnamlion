const env = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient(env['KAKAO_CLIENT_KEY'], 'https://developers.kakao.com');
Kakao.login(env['KAKAO_ID'], env['KAKAO_PASSWORD']); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  let [command, ticker] = msg.split(' ');
  if (ticker && command === '빗') {
    try {
      if (Object.keys(dict_data).indexOf(ticker) > -1) {
        ticker = dict_data[ticker];
      }
      const coinList = callCoinSymbol();
      if (ticker in coinList) {
        let coinInfo = callCoinInfo(coinList[ticker]);
        coinInfo = coinInfo.data;
        const minPrice = coinInfo['min_price'],
          maxPrice = coinInfo['max_price'],
          currentPrice = coinInfo['closing_price'],
          accTrade = (coinInfo['acc_trade_value_24H'] / 100000000).toFixed(2),
          openingPrice = coinInfo['opening_price'],
          maxPercent = (((openingPrice - coinInfo['max_price']) / openingPrice) * 100 * -1).toFixed(2),
          minPercent = (((openingPrice - coinInfo['min_price']) / openingPrice) * 100 * -1).toFixed(2);
        const priceFluctuations = (((currentPrice - openingPrice) / openingPrice) * 100).toFixed(2);
        const template_args = {
          ticker: ticker,
          minPrice: numberWithCommas(minPrice),
          maxPrice: numberWithCommas(maxPrice),
          maxPercent: maxPercent,
          minPercent: minPercent,
          priceFluctuations: priceFluctuations,
          currentPrice: numberWithCommas(currentPrice),
          accTrade: numberWithCommas(accTrade),
          openingPrice: numberWithCommas(openingPrice),
          difference: (currentPrice - openingPrice).toFixed(2),
        };
        Kakao.sendLink(
          room,
          {
            link_ver: '4.0',
            template_id: 79951,
            template_args: template_args,
          },
          'custom',
          true
        ).then((res) => {
          if (res.status === 400) {
            let result = '';
            result += ticker + '\n\n';
            result += '등락 ' + (currentPrice - openingPrice).toFixed(2) + '원(' + priceFluctuations + '%)\n';
            result += '📈24H 고가 : (' + maxPercent + '%) ' + maxPrice + '원\n';
            result += '📉24H 저가 : (' + minPercent + '%) ' + minPrice + '원\n';
            result += '24H 종가 : ' + openingPrice + '원\n';
            result += '📊24H 거래량 : ' + accTrade + '\n\n\n';
            result += '💰현재가 : (' + priceFluctuations + '%)' + currentPrice + '원';
            replier.reply(result);
          }
        });
      }
    } catch (error) {
      replier.reply('api error');
    }
  }
}
/* 화폐단위 컴마출력 */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function callCoinSymbol() {
  let result = {};
  const bithumbUrl = 'https://gw.bithumb.com/exchange/v1/comn/intro';
  const data = JSON.parse(org.jsoup.Jsoup.connect(bithumbUrl).ignoreContentType(true).get().text());

  for (let item of data && data.data && data.data.coinList) {
    result[item.coinName] = item.coinSymbol;
  }
  return result;
}

function callCoinInfo(ticker) {
  return JSON.parse(
    org.jsoup.Jsoup.connect('https://api.bithumb.com/public/ticker/' + ticker + '_KRW')
      .ignoreContentType(true)
      .get()
      .text()
  );
}
