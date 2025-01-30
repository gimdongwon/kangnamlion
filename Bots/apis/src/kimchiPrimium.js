function main(replier) {
  const coins = ['BTC', 'ETH', 'XRP', 'SOL']; // 코인 배열

  let result = '📊 김치 프리미엄 조회 결과\n\n'; // 이모지 추가

  // 각 코인 순회
  for (let i = 0; i < coins.length; i += 1) {
    let coin = coins[i]; // 현재 코인

    try {
      // 업비트 가격
      let url_upbit = 'http://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-' + coin;
      let upbit = JSON.parse(org.jsoup.Jsoup.connect(url_upbit).ignoreContentType(true).get().text());
      let upbitPrice = upbit[0].tradePrice;

      // 빗썸 가격
      let url_bithumb = 'https://api.bithumb.com/public/transaction_history/' + coin + '_KRW';
      let bith = JSON.parse(org.jsoup.Jsoup.connect(url_bithumb).ignoreContentType(true).get().text());
      let bithPrice = bith.data[0].price;

      // 바이낸스 가격
      const url_binance = 'https://api.binance.com/api/v1/ticker/allPrices';
      const binance = JSON.parse(org.jsoup.Jsoup.connect(url_binance).ignoreContentType(true).get().text());
      let coinName = coin + 'USDT';

      let binancePrice = 0;

      for (let j = 0; j < binance.length; j++) {
        if (binance[j].symbol === coinName) {
          binancePrice = Number(binance[j].price);
          break;
        }
      }

      if (binancePrice === 0) {
        result += '❌ [' + coin + '] 바이낸스 가격 조회 실패\n';
        continue;
      }

      // 김프 계산
      const usdToKrw = callDollor(1);

      // 업비트 김프
      let gimpUpbit = upbitPrice - binancePrice * usdToKrw;
      gimpUpbit = (gimpUpbit / upbitPrice) * 100;
      gimpUpbit = gimpUpbit.toFixed(2);

      // 빗썸 김프
      let gimpBithumb = bithPrice - binancePrice * usdToKrw;
      gimpBithumb = (gimpBithumb / bithPrice) * 100;
      gimpBithumb = gimpBithumb.toFixed(2);

      // 결과 추가
      result += '🔸 [' + coin + ']\n';
      result += '  🌐 바이낸스: ' + divide(binancePrice) + ' USD\n';
      result += '  📈 업비트: ' + gimpUpbit + '% (' + divide(upbitPrice) + ' 원)\n';
      result += '  📉 빗썸: ' + gimpBithumb + '% (' + divide(bithPrice) + ' 원)\n';

      // 마지막 공백 제거를 위해 '\n\n' 추가하지 않음
      if (i < coins.length - 1) {
        result += '\n'; // 코인 간 공백 추가
      }
    } catch (error) {
      result += '❌ [' + coin + '] 에러 발생: ' + error.message + '\n';
    }
  }

  // 결과 출력
  replier.reply(result.trim()); // 마지막 공백 제거
}

// 달러 환율 계산
function callDollor(usd) {
  const url = 'https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=' + '달러';
  const dollorData = org.jsoup.Jsoup.connect(url).get();
  let money = dollorData.select('div.inner_price > em.txt_num').text();
  money = money.replace(/,/g, ''); // 쉼표 제거
  money = Math.round(money);
  return money * usd;
}

// 천 단위 구분
function divide(num) {
  const parts = num.toString().split('.');
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
}

exports.ApiService = main;
