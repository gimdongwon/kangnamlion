const env = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient(env['KAKAO_CLIENT_KEY'], 'https://developers.kakao.com');
Kakao.login(env['KAKAO_ID'], env['KAKAO_PASSWORD']); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/binanceDict.json'));
  let [command, ticker] = msg.split(' ');
  if (ticker && command === '바') {
    try {
      if (Object.keys(dict_data).indexOf(ticker) > -1) {
        ticker = dict_data[ticker];
      }
      const coinList = callCoinSymbol();
      const coinInfo = coinList[ticker + 'USDT'];

      const minPrice = coinInfo['lowPrice'];
      const maxPrice = coinInfo['highPrice'];
      const priceChange = coinInfo['priceChange'];
      const currentPrice = coinInfo['lastPrice'];
      const volume = coinInfo['volume'];
      const priceChangePercent = coinInfo['priceChangePercent'];
      const openingPrice = coinInfo['openPrice'];
      const maxPercent = (((openingPrice - coinInfo['highPrice']) / openingPrice) * 100 * -1).toFixed(2);
      const minPercent = (((openingPrice - coinInfo['lowPrice']) / openingPrice) * 100 * -1).toFixed(2);

      const dollor = getDollor();

      let result = '바이낸스 ';
      result += ticker + 'USDT\n\n';
      result += '등락 : (' + Number(priceChangePercent) + '%) ' + numberWithCommas(Number(priceChange)) + '$\n';
      result += '24H 고가 : (' + Number(maxPercent) + '%) ' + numberWithCommas(Number(maxPrice)) + ' $\n';
      result += '24H 저가 : (' + +Number(minPercent) + '%) ' + numberWithCommas(Number(minPrice)) + ' $\n';
      result += '24H 거래량 : ' + numberWithCommas(Number(volume)) + ' $\n\n';
      result +=
        '💸 현재가 : ' +
        numberWithCommas(Number(currentPrice)) +
        ' $\n = ' +
        numberWithCommas(Number(currentPrice * dollor).toFixed(2)) +
        '원';

      // result += '24H 종가 : ' + openingPrice + '원\n';
      replier.reply(result);
      /*
        Kakao.sendLink(
          room,
          {
            template_id: 79951,
            template_args: {
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
            },
          },
          'custom'
        );
        */
    } catch (e) {
      Api.replyRoom(
        '개발자 이름',
        '[ 가격알람봇 오류발생🚨  ]\n\n오류 이름: ' +
          e.name +
          '\n오류 메시지: ' +
          e.message +
          '\n오류 위치: ' +
          e.lineNumber
      );
    }
  }
}
/* 화폐단위 컴마출력 */
function numberWithCommas(x) {
  return x > 1 ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x;
}

function callCoinSymbol(replier) {
  let result = {};
  const bithumbUrl = 'https://api.binance.com/api/v3/ticker/24hr';
  const data = JSON.parse(org.jsoup.Jsoup.connect(bithumbUrl).ignoreContentType(true).get().text());

  for (let item of data) {
    if (item.symbol.includes('USDT')) {
      result[item.symbol] = item;
    }
  }
  return result;
}

function getDollor() {
  const url = 'https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=' + '달러';
  const dollorData = org.jsoup.Jsoup.connect(url).get();
  let money = dollorData.select('div.inner_price > em.txt_num').text();
  money = money.replace(',', '');
  return money;
}
