function main(msg, sender, replier, room, useKakaoLink, useError) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  let symbol = msg.slice(2);
  try {
    if (Object.keys(dict_data).indexOf(symbol) > -1) {
      symbol = dict_data[symbol];
    }
    const coinList = callCoinSymbol();
    if (symbol in coinList) {
      let coinInfo = callCoinInfo(coinList[symbol]);
      if (coinInfo === '') {
        return;
      }
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
        template_id: 79951,
        template_args: {
          symbol: symbol,
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
      };

      let result = '';
      result += symbol + '\n\n';
      result += '🔽등락 ' + (currentPrice - openingPrice).toFixed(2) + '원(' + priceFluctuations + '%)\n';
      result += '📈24H 고가 : (' + maxPercent + '%) ' + numberWithCommas(maxPrice) + '원\n';
      result += '📉24H 저가 : (' + minPercent + '%) ' + numberWithCommas(minPrice) + '원\n';
      result += '💵24H 종가 : ' + numberWithCommas(openingPrice) + '원\n';
      result += '📊24H 거래량 : ' + accTrade + '\n\n\n';
      result += '💰현재가 : (' + priceFluctuations + '%) ' + numberWithCommas(currentPrice) + '원';

      replier.reply(result);
      // useKakaoLink(room, replier, template_args, result);
    }
  } catch (e) {
    replier.reply('에러가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    useError(msg, sender, room, e);
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

/* 화폐단위 컴마출력 */

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

exports.ApiService = main;
