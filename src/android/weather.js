const { KakaoLinkClient } = require('kakaolink');

const Kakao = new KakaoLinkClient(KAKAO_CLIKENT_KEY, 'https://developers.kakao.com');
Kakao.login(KAKAO_ID, KAKAO_PASSWORD); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier) {
  if (sender === '용키') return;
  if (msg.startsWith('날씨 ')) {
    let region = msg.slice(3);

    if (isNaN(region)) {
      try {
        let url = org.jsoup.Jsoup.connect('https://www.google.com/search?q=' + region + ' 날씨').get();

        let image = 'http:' + url.select('#wob_tci').attr('src');

        let resultDC = url.select('#wob_dc').text(); //상태?

        let resultPP = url.select('#wob_pp').text(); //강수확률

        let resultTM = url.select('#wob_tm').text(); //온도

        let resultWS = url.select('#wob_ws').text(); //풍속

        let resultHM = url.select('#wob_hm').text(); //습도

        if (resultDC == '') {
          replier.reply('올바른 지역의 날씨를 검색해주세요. :( \n날씨 서대문역');

          return;
        }

        Kakao.sendLink(room, {
          template_id: 79058,
          template_args: {
            image: image,
            region: region,
            status: resultDC,
            precipitation: resultPP,
            temperature: resultTM,
            wind: resultWS,
            humidity: resultHM,
          },
        });

        // replier.reply(
        //   '지금 현재 ' +
        //     region +
        //     '의 날씨는 "' +
        //     resultDC +
        //     '"입니다. 온도는 ' +
        //     resultTM +
        //     '°C 입니다.\n\n강수확률: ' +
        //     resultPP +
        //     '\n풍속: ' +
        //     resultWS +
        //     '\n습도: ' +
        //     resultHM
        // );
      } catch (e) {
        replier.reply(e, '불러올 수 없는 지역이거나 지원되지 않는 지역입니다.');

        return;
      }
    } else {
      replier.reply('지역을 잘못 나타냈어요(EX.날씨 "조회할 지역")');

      return;
    }
  }
}
