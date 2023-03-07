const blank = '\u200b'.repeat(1000);

function main(msg, replier) {
  let skip = msg.substr(3);
  if (skip.length <= 0) {
    return;
  }
  let a = '';
  const web = org.jsoup.Jsoup.connect(
    'https://search.naver.com/search.naver?query=' + skip + '&where=news&ie=utf8&sm=nws_hty'
  ).get();

  for (i = 0; i < web.select('a.news_tit').length; i++) {
    a +=
      '=> ' +
      web.select('a.news_tit').get(i).text() +
      ' / ' +
      web.select('a.info.press').get(i).text().replace('선정', '') +
      '\n' +
      web.select('a.news_tit').get(i).attr('href') +
      '\n\n';
  }
  replier.reply("['" + skip + "' 뉴스 검색결과 입니다]\n" + blank + '\n' + a);
}

exports.ApiService = main;
