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
          openingPrice = coinInfo['opening_price'];
        const priceFluctuations = (((currentPrice - openingPrice) / openingPrice) * 100).toFixed(2);

        Kakao.sendLink(
          room,
          {
            template_id: 79951,
            template_args: {
              ticker: ticker,
              minPrice: numberWithCommas(minPrice),
              maxPrice: numberWithCommas(maxPrice),
              priceFluctuations: priceFluctuations,
              currentPrice: numberWithCommas(currentPrice),
              accTrade: numberWithCommas(accTrade),
              openingPrice: numberWithCommas(openingPrice),
              difference: (currentPrice - openingPrice).toFixed(2),
            },
          },
          'custom'
        );
      } else {
        replier.reply('해당 코인이 존재하지 않습니다 다른 코인을 조회해주세요.');
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
