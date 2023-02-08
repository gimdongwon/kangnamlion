function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if (msg.indexOf('시청률 ') == 0) {
    try {
      var sub = msg.substr(4);

      var site = org.jsoup.Jsoup.connect(
        'https://search.naver.com/search.naver?query=' + sub + '%EC%8B%9C%EC%B2%AD%EB%A5%A0'
      );

      var newly =
        '최신 시청률: ' +
        site.get().select('span.percent_num').get(0).text() +
        '% (' +
        site.get().select('span.rating_ep').get(0).text() +
        ')';

      var best =
        '최고 시청률: ' +
        site.get().select('span.percent_num').get(1).text() +
        '% (' +
        site.get().select('span.rating_ep').get(1).text() +
        ')';

      var tit = site.get().select('strong._text').get(0).text();

      replier.reply(
        "[''" + tit + "'' 시청률 입니다. (최신 30회차)]\n\n" + newly + '\n' + best + '\n\n-출처: 닐슨 코리아-'
      );
    } catch (e) {
      replier.reply('요청하신 프로그램의 시청률 정보를 불러올 수 없습니다.');
    }
  }
}
