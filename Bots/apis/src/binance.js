function main(msg, sender, replier, room, useError) {
  let ticker = msg.slice(2);
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/binanceDict.json'));
  if (ticker) {
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
    } catch (e) {
      // replier.reply('에러가 발생했습니다. 잠시 후에 다시 시도해주세요.');
      useError(msg, sender, room, e);
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

exports.ApiService = main;
