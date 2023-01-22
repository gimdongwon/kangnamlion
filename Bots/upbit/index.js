function main(replier, room, symbol) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  replier.reply(symbol);
  replier.reply('hi2');
  if (Object.keys(dict_data).indexOf(symbol) > -1) {
    symbol = dict_data[symbol];
  }

  // /* 업비트 코인가격 */
  let upbit_coin_symbol = '';

  let coin_symbol_krw = JSON.parse(
    org.jsoup.Jsoup.connect('https://api.upbit.com/v1/market/all').ignoreContentType(true).get().text()
  );

  for (let i in coin_symbol_krw) {
    let keywordData = coin_symbol_krw[i];
    let keywordData_replaced = keywordData['korean_name'].replace(/(<([^>]+)>)/gi, ' ');
    if (keywordData_replaced == symbol) {
      upbit_coin_symbol = keywordData['market'].replace(/(<([^>]+)>)/gi, ' ').split('-')[1];
    }
  }

  if (upbit_coin_symbol === '') {
    return;
  }

  upbit_coin_symbol = upbit_coin_symbol.toUpperCase();

  let upbit_json = upbit_func(upbit_coin_symbol);

  const openingPrice = upbit_json[0]['opening_price'],
    maxPercent = (((openingPrice - upbit_json[0]['high_price']) / openingPrice) * 100 * -1).toFixed(2),
    minPercent = (((openingPrice - upbit_json[0]['low_price']) / openingPrice) * 100 * -1).toFixed(2);

  const template_args = {
    template_id: 77428,
    template_args: {
      upbit_coin_symbol: upbit_coin_symbol,
      now_price: numberWithCommas(upbit_json[0].trade_price),
      percent: (upbit_json[0].signed_change_rate * 100).toFixed(2),
      max_price: numberWithCommas(upbit_json[0].high_price),
      min_price: numberWithCommas(upbit_json[0].low_price),
      finish_price: numberWithCommas(upbit_json[0].prev_closing_price),
      trade_volume: numberWithCommas(upbit_json[0].acc_trade_volume_24h.toFixed(2)),
      maxPercent: maxPercent,
      minPercent: minPercent,
    },
  };

  let output_text = '';
  output_text += '[UPBIT API]\n';
  output_text += '<' + upbit_coin_symbol + '/KRW>\n';
  output_text +=
    numberWithCommas('현재가 ' + upbit_json[0].trade_price) +
    ' (' +
    (upbit_json[0].signed_change_rate * 100).toFixed(2) +
    '%)\n\n';
  output_text += '24H 고가 : (' + maxPercent + '%)' + numberWithCommas(upbit_json[0].high_price) + ' KRW\n';
  output_text += '24H 저가 : (' + minPercent + '%)' + numberWithCommas(upbit_json[0].low_price) + ' KRW\n';
  output_text += '24H 종가 : ' + numberWithCommas(upbit_json[0].prev_closing_price) + ' KRW\n';
  output_text +=
    '24H 거래량 : ' + numberWithCommas(upbit_json[0].acc_trade_volume_24h.toFixed(2)) + ' ' + upbit_coin_symbol;

  const useKakaoLink = Bridge.getScopeOf('kakaolink').useKakaoLink;
  useKakaoLink(room, replier, template_args, output_text);
}
/* 업비트 JSON 함수 */

function upbit_func(coin_symbol) {
  let upbit_url = 'https://api.upbit.com/v1/ticker?markets=KRW-';
  upbit_url += coin_symbol;
  return JSON.parse(org.jsoup.Jsoup.connect(upbit_url).ignoreContentType(true).get().text());
}
/* 화폐단위 컴마출력 */

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
