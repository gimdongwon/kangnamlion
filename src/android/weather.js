function response(room, msg, sender, isGroupChat, replier) {
  if (msg.startsWith('날씨 ')) {
    let weather = msg.slice(4);

    if (isNaN(weather)) {
      try {
        let url = org.jsoup.Jsoup.connect('https://www.google.com/search?q=' + weather + ' 날씨').get();

        let resultDC = url.select('#wob_dc').text(); //상태?

        let resultPP = url.select('#wob_pp').text(); //강수확률

        let resultTM = url.select('#wob_tm').text(); //온도

        let resultWS = url.select('#wob_ws').text(); //풍속

        let resultHM = url.select('#wob_hm').text(); //습도

        if (resultDC == '') {
          replier.reply('올바른 지역의 날씨를 검색해주세요. :( \n 날씨 서대문역');

          return;
        }

        replier.reply(
          '지금 현재 ' +
            weather +
            '의 날씨는 "' +
            resultDC +
            '"입니다. 온도는 ' +
            resultTM +
            '°C 입니다.\n\n강수확률: ' +
            resultPP +
            '\n풍속: ' +
            resultWS +
            '\n습도: ' +
            resultHM
        );
      } catch (e) {
        replier.reply('불러올 수 없는 지역이거나 지원되지 않는 지역입니다.');

        return;
      }
    } else {
      replier.reply('지역을 잘못 나타냈어요(EX.날씨 "조회할 지역")');

      return;
    }
  }
}
