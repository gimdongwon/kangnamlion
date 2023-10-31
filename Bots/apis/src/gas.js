function main(replier) {
  const url = 'https://etherscan.io/gastracker';

  const lowPrice = org.jsoup.Jsoup.connect(url).get().select('div#divLowPrice > div.d-flex > div.h4').text();
  const avgPrice = org.jsoup.Jsoup.connect(url).get().select('div#divAvgPrice > div.d-flex > div.h4').text();
  const highPrice = org.jsoup.Jsoup.connect(url).get().select('div#divHighPrice > div.d-flex > div.h4').text();
  const baseGas = org.jsoup.Jsoup.connect(url).get().select('span#spanLowPriorityAndBase').text();

  let result = '⛽️ 이더리움 가스비 조회 ⛽️\n\n';

  result += '💧 Low: ' + lowPrice + '\n';
  result += '⛽️ Avg: ' + avgPrice + '\n';
  result += '🔥 High: ' + highPrice + '\n\n';

  result += baseGas;
  replier.reply(result);
}

exports.ApiService = main;
