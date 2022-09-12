const dictUnit = {
  백: 100,
  천: 1000,
  만: 10000,
  십만: 100000,
  백만: 1000000,
  천만: 10000000,
  억: 100000000,
};

const currencys = ['달러', '달라', '유로', '엔', '위안', '파운드'];

const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  let [command, volume, ticker] = msg.split(' ');
  if (volume && ticker && (command === '계산' || command === '계싼')) {
    if (Object.keys(dict_data).indexOf(ticker) > -1) {
      ticker = dict_data[ticker];
    }
    if (korean.test(volume)) {
      const valueKorea = volume.replace(/[0-9]/g, '');
      volume = volume.replace(/[^0-9]/g, '') * dictUnit[valueKorea];
    }
    if (currencys.includes(ticker)) {
      const url = 'https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=' + ticker;
      const dollorData = org.jsoup.Jsoup.connect(url).get();
      let money = dollorData.select('div.inner_price > em.txt_num').text();
      money = money.replace(',', '');
      if (ticker === '엔') {
        money *= 0.01;
      }
      replier.reply('= ' + numberWithCommas(money * volume) + ' 원');
      return;
    }
    const coinList = callCoinSymbol();

    if (ticker in coinList) {
      let coinInfo = callCoinInfo(coinList[ticker]);
      coinInfo = coinInfo.data;
      const currentPrice = coinInfo['closing_price'];
      replier.reply('= ' + numberWithCommas(currentPrice * volume) + ' 원');
    } else {
      const data = org.jsoup.Jsoup.connect(
        'https://www.google.com/search?q=주식%20' + ticker.replace(/ /g, '%20')
      ).get();

      const unit = data.select('span.knFDje').text();
      let currentInvestPrice = data.select('span.wT3VGc').text();
      currentInvestPrice = currentInvestPrice.replace(',', '');

      replier.reply('= ' + numberWithCommas(currentInvestPrice * volume) + ' ' + unit);
    }
  }
}
/* 화폐단위 컴마출력 */
function numberWithCommas(x) {
  x = Math.round(x * 100) / 100;
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
