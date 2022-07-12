function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if (msg === '김프') {
    var coin = 'BTC';

    //업비트 btc 가격

    var url = 'http://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-' + coin;

    var upbit = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());

    upbitPrice = upbit[0].tradePrice;

    //빗썸 btc 가격

    var url = 'https://api.bithumb.com/public/transaction_history/' + coin + '_KRW';

    var bith = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());

    bith_price = bith.data[0].price;

    // 바이낸스 btc 가격

    var url = 'https://api.binance.com/api/v1/ticker/allPrices';

    var binance = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());

    var coin_name = coin + 'USDT';

    var i = 0;

    while (1) {
      if (i > 1372) {
        break;
      }

      if (coin_name == binance[i].symbol) {
        price = binance[i].price;

        var price = Number(price);

        if (price < 1000) {
          price = price.toFixed(4);
        }

        break;
      }

      i++;
    }

    //김프 계산

    //업비트 김프

    gimp_u = upbitPrice - change2KRW(price);

    gimp_u = (gimp_u / upbitPrice) * 100;

    gimp_u = gimp_u.toFixed(2);

    //빗썸 김프

    gimp_b = bith_price - change2KRW(price);

    gimp_b = (gimp_b / upbitPrice) * 100;

    gimp_b = gimp_b.toFixed(2);

    // 출력

    replier.reply(
      '바이낸스\n[BTC : ' +
        divide(price) +
        '$ ]' +
        '\n업비트 ' +
        gimp_u +
        '% : ' +
        divide(upbitPrice) +
        '원' +
        '\n빗썸 ' +
        gimp_b +
        '% : ' +
        divide(bith_price) +
        '원'
    );
  }
}

//환율

function change2KRW(usd) {
  var url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';

  var exchange = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());

  basePrice = exchange[0].basePrice;

  var result = usd * basePrice;

  return result;
}

//천자리 표기

function divide(num) {
  var parts = num.toString().split('.');

  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
}
