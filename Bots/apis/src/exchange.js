function main(replier) {
  const url = 'https://www.citibank.co.kr/FxdExrt0100.act';
  const data = org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().select('span.green');

  let [CNY, EUR, JPY, USD] = data;

  let result = '환율\n\n';
  result += '미국 USD : ' + USD.text() + '원\n';
  result += '일본 JPY : ' + JPY.text() + '원\n';
  result += '중국 CNY : ' + CNY.text() + '원\n';
  result += '유럽 EUR : ' + EUR.text() + '원';

  replier.reply(result);
}

exports.ApiService = main;
