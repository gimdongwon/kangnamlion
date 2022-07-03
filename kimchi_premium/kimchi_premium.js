importClass(org.jsoup.Jsoup);

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if (msg.startsWith('!김프')) {
    const coin = 'BTC';

    // 업비트 btc 가격

    var url = `http://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-${coin}`;

    const upbit = JSON.parse(Jsoup.connect(url).ignoreContentType(true).get().text());

    upbitPrice = upbit[0].tradePrice;

    // 빗썸 btc 가격

    var url = `https://api.bithumb.com/public/transaction_history/${coin}_KRW`;

    const bith = JSON.parse(Jsoup.connect(url).ignoreContentType(true).get().text());

    bith_price = bith.data[0].price;

    // 바이낸스 btc 가격

    var url = 'https://api.binance.com/api/v1/ticker/allPrices';

    const binance = JSON.parse(Jsoup.connect(url).ignoreContentType(true).get().text());

    const symbol = `${coin}USDT`;

    let i = 0;

    while (1) {
      if (i > 1372) {
        break;
      }

      if (symbol === binance[i].symbol) {
        let price = Number(binance[i].price);

        if (price < 1000) {
          price = price.toFixed(4);
        }

        break;
      }

      i += 1;
    }

    // 김프 계산

    // 업비트 김프

    gimp_u = upbitPrice - change2KRW(price);

    gimp_u = (gimp_u / upbitPrice) * 100;

    gimp_u = gimp_u.toFixed(2);

    // 빗썸 김프

    gimp_b = bith_price - change2KRW(price);

    gimp_b = (gimp_b / upbitPrice) * 100;

    gimp_b = gimp_b.toFixed(2);

    // 출력

    replier.reply(
      `##김프 도우미## \n [BTC : ${
        divide(price)
      }$ ]`
        + `\n업비트 ${
          gimp_u
        }% : ${
          divide(upbitPrice)
        }원`
        + `\n빗썸 ${
          gimp_b
        }% : ${
          divide(bith_price)
        }원`,
    );
  }
}

// 환율

function change2KRW(usd) {
  const url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';

  const exchange = JSON.parse(Jsoup.connect(url).ignoreContentType(true).get().text());

  basePrice = exchange[0].basePrice;

  const result = usd * basePrice;

  return result;
}

// 천자리 표기

function divide(num) {
  const parts = num.toString().split('.');

  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? `.${parts[1]}` : '');
}
