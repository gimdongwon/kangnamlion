var blank = '\u200b'.repeat(1000);

function response(room, msg, sender, isGroupChat, replier, imageDB, pakeageName, threadld) {
  if (msg.includes('영화')) {
    try {
      var a = '';

      var web = org.jsoup.Jsoup.connect(
        'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=상영중영화'
      ).get();

      for (i = 0; i < 8; i++) {
        a +=
          '<' +
          web.select('a.this_text._text').get(i).text() +
          '>\n' +
          web
            .select('div.info')
            .get(i)
            .text()
            .replace('개봉', 'ㄴ개봉:')
            .replace('평점', '\nㄴ평점:')
            .replace('출연', '\nㄴ출연:') +
          '\n\n';
      }

      replier.reply('[현재 상영중인 영화 목록입니다]\n' + blank + '\n' + a);
    } catch (e) {
      replier.reply('상영중인 영화를 찾지 못했습니다.');
    }
  }
}
