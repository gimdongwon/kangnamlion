const dictUnit = {
  백: 100,
  천: 1000,
  만: 10000,
  십만: 100000,
  백만: 1000000,
  천만: 10000000,
  억: 100000000,
};

const currencys = ['불', '달러', '달라', '유로', '엔', '위안', '파운드'];

const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

function main(msg, sender, replier, room, target) {
  const useError = Bridge.getScopeOf('useError').replyError;
  try {
    const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));

    let [volume, ticker] = target.split(' ');
    if (volume && ticker) {
      if (Object.keys(dict_data).indexOf(ticker) > -1) {
        ticker = dict_data[ticker];
      }
      if (korean.test(volume)) {
        const valueKorea = volume.replace(/[0-9]/g, '');
        volume = volume.replace(/[^0-9]/g, '') * dictUnit[valueKorea];
      }
      // 통화
      if (currencys.includes(ticker)) {
        if (ticker === '불') ticker = '달러';
        const url = 'https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=' + ticker;
        const dollorData = org.jsoup.Jsoup.connect(url).get();
        let money = dollorData.select('div.inner_price > em.txt_num').text();
        money = money.replace(',', '');
        if (ticker === '엔') {
          money *= 0.01;
        }
        money = numberWithCommas(money * volume);
        if (money.length > 10) {
          money = replaceNumToText(money);
        }
        replier.reply('= ' + money + ' 원');
        return;
      }
      const coinList = callCoinSymbol();
      // 코인
      if (ticker in coinList) {
        let coinInfo = callCoinInfo(coinList[ticker]);
        coinInfo = coinInfo.data;
        const currentPrice = coinInfo['closing_price'];
        let money = numberWithCommas(currentPrice * volume);
        if (money.length > 10) {
          money = replaceNumToText(money);
        }
        replier.reply('= ' + money + ' 원');
      } else {
        // 주식
        const data = org.jsoup.Jsoup.connect(
          'https://www.google.com/search?q=주식%20' + ticker.replace(/ /g, '%20')
        ).get();

        const unit = data.select('span.knFDje').text();
        let currentInvestPrice = data.select('span.wT3VGc').text();
        currentInvestPrice = currentInvestPrice.replace(',', '');
        replier.reply('= ' + numberWithCommas(currentInvestPrice * volume) + ' ' + unit);
        if (unit === 'USD') {
          const dollor = callDollor();
          let money = numberWithCommas(currentInvestPrice * volume * dollor);
          if (money.length > 10) {
            money = replaceNumToText(money);
          }
          replier.reply('= ' + money + ' 원');
        }
      }
    }
  } catch (e) {
    replier.reply('에러가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    useError(msg, sender, room, e);
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

function callDollor() {
  const url = 'https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=' + '달러';
  const dollorData = org.jsoup.Jsoup.connect(url).get();
  let money = dollorData.select('div.inner_price > em.txt_num').text();
  money = Math.round(money);
  return money;
}

function replaceNumToText(money) {
  money = money.slice(0, money.length - 10).replace(/,/gi, '');
  money = numberWithCommas(money) + '억';
  return money;
}
