function main(replier) {
  // const url = 'https://www.citibank.co.kr/FxdExrt0100.act';
  // const data = org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().select('span.green');

  // let [USD, CNY, EUR, JPY] = data;
  const url = 'https://www.kita.net/cmmrcInfo/ehgtGnrlzInfo/rltmEhgt.do';
  const data = org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().select('tbody > tr');
  const USD = data[0].select('td')[0].text();
  const JPY = data[1].select('td')[0].text();
  const EUR = data[2].select('td')[0].text();
  const CNY = data[3].select('td')[0].text();

  let result = '환율 x 한국무역협회(KITA) x 강남사자🚀 \n\n';
  result += '미국 USD : ' + USD + '원\n';
  result += '일본 JPY : ' + JPY + '원\n';
  result += '중국 CNY : ' + CNY + '원\n';
  result += '유럽 EUR : ' + EUR + '원';

  replier.reply(result);
}

exports.ApiService = main;
