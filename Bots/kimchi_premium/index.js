function get(url) {
  return JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
}

function krw(usd) {
  const exchange = get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD');
  return usd * exchange[0].basePrice;
}

function divide(num) {
  const parts = num.toString().split('.');
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? `.${parts[1]}` : '');
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if (msg !== '김프') {
    return;
  }

  const coin = 'BTC';
  const name = `${coin}USDT`;

  const upbit = get(`http://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-${coin}`);
  const upbitPrice = upbit[0].tradePrice;

  const bith = get(`https://api.bithumb.com/public/transaction_history/${coin}_KRW`);
  const bithPrice = bith.data[0].price;

  const binance = get('https://api.binance.com/api/v1/ticker/allPrices');

  let price = 0;
  let i = 0;
  while (i <= 1372) {
    if (name === binance[i].symbol) {
      price = Number(binance[i].price);

      if (price < 1000) {
        price = price.toFixed(4);
      }

      break;
    }

    i += 1;
  }

  let gimpU = upbitPrice - krw(price);
  gimpU = (gimpU / upbitPrice) * 100;
  gimpU = gimpU.toFixed(2);

  let gimpB = bithPrice - krw(price);
  gimpB = (gimpB / bithPrice) * 100;
  gimpB = gimpB.toFixed(2);

  replier.reply(
    `바이낸스\n[BTC : ${divide(price)}$ ]`
    + `\n업비트 ${gimpU}% : ${divide(upbitPrice)}원`
    + `\n빗썸 ${gimpB}% : ${divide(bithPrice)}원`,
  );
}
