var blank = '\u200b'.repeat(1000);

function response(room, msg, sender, isGroupChat, replier, imageDB, pakeageName, threadld) {
  if (msg.indexOf('뉴스 ') == 0) {
    try {
      let skip = msg.substr(3);
      var a = '';
      var web = org.jsoup.Jsoup.connect(
        'https://search.naver.com/search.naver?query=' + skip + '&where=news&ie=utf8&sm=nws_hty'
      ).get();

      for (i = 0; i < 10; i++) {
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
    } catch (e) {
      replier.reply('찾지 못했습니다.');
    }
  }
}
