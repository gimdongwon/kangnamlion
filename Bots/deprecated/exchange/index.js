function response(room, msg, sender, isGroupChat, replier, imageDB, pakeageName, threadld) {
  if (msg.startsWith('환율 ')) {
    var mal = msg.substr(3).trim();

    try {
      var web = org.jsoup.Jsoup.connect(
        'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=환율+' + mal
      ).get();

      var info = web
        .select(
          '#_cs_foreigninfo > div > div.api_cs_wrap > div > div.c_rate > div > div.rate_compare > div.compare_area > div > div:nth-child(1) > div.input_box._input_box > span.recite._recite'
        )
        .get(0)
        .text();

      var info2 = web
        .select(
          '#_cs_foreigninfo > div > div.api_cs_wrap > div > div.c_rate > div > div.rate_compare > div.compare_area > div > div:nth-child(3) > div.input_box._input_box > span.recite._recite.result'
        )
        .get(0)
        .text();

      var date = web
        .select(
          '#_cs_foreigninfo > div > div.api_cs_wrap > div > div.c_rate > div > div.rate_spot._rate_spot > div.cont_grp._graph > p > em'
        )
        .get(0)
        .text()
        .replace(' ', ', ');

      replier.reply(
        '[환율 검색결과 입니다]\n' +
          '(' +
          date +
          ' 기준)' +
          '\n\n' +
          mal +
          '의 화폐단위:  ' +
          info +
          '\n대한민국 환율: ' +
          info2
      );
    } catch (e) {
      replier.reply('검색에 실패하였습니다!');
    }
  }
}
