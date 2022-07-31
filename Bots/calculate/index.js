function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  let [command, volume, ticker] = msg.split(' ');
  if (ticker && command === '계산') {
    if (Object.keys(dict_data).indexOf(ticker) > -1) {
      ticker = dict_data[ticker];
    }
    const coinList = callCoinSymbol();
    if (ticker in coinList) {
      let coinInfo = callCoinInfo(coinList[ticker]);
      coinInfo = coinInfo.data;
      const currentPrice = coinInfo['closing_price'];
      replier.reply('= ' + numberWithCommas(currentPrice * volume) + ' 원');
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
