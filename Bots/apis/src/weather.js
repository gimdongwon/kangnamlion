function main(msg, sender, replier, room, useKakaoLink, useError) {
  const region = msg.slice(3);
  if (isNaN(region)) {
    try {
      let url = org.jsoup.Jsoup.connect('https://www.google.com/search?q=' + region + ' 날씨').get();

      let image = 'http:' + url.select('#wob_tci').attr('src');
      let resultDC = url.select('#wob_dc').text(); //상태?
      let resultPP = url.select('#wob_pp').text(); //강수확률
      let resultTM = url.select('#wob_tm').text(); //온도
      let resultWS = url.select('#wob_ws').text(); //풍속
      let resultHM = url.select('#wob_hm').text(); //습도

      let highTM = url.select('div.wob_ds > div.wNE31c > div.gNCp2e > span.wob_t').text().split(' ')[0];
      let lowTM = url.select('div.wob_ds > div.wNE31c > div.ZXCv8e > span.wob_t').text().split(' ')[0];

      if (resultDC == '') {
        replier.reply('올바른 지역의 날씨를 검색해주세요. :( \n날씨 서대문역');
        return;
      }
      const obj = {
        template_id: 79058,
        template_args: {
          image: image,
          region: region,
          status: resultDC,
          precipitation: resultPP,
          temperature: resultTM,
          wind: resultWS,
          humidity: resultHM,
          highTM: highTM,
          lowTM: lowTM,
        },
      };
      let text = '';
      text += region + '의 날씨 🌡\n\n';
      text += '상태 : ' + resultDC + '\n\n';
      text += '온도 : ' + resultTM + '도\n';
      text += '최고온도 : ' + highTM + '도\n';
      text += '최저온도 : ' + lowTM + '도\n';
      text += '강수확률 : ' + resultPP + '\n';
      text += '풍속 : ' + resultWS + '\n';
      text += '습도 : ' + resultHM + '\n\n';
      text += '좋은 날씨로 좋은 하루보내세요 🦁 🌈☀️❄️💧';

      useKakaoLink(room, replier, obj, text);
    } catch (e) {
      replier.reply('불러올 수 없는 지역이거나 지원되지 않는 지역입니다.');
      useError(msg, sender, room, e);
    }
  } else {
    replier.reply('지역을 잘못 나타냈어요(EX.날씨 "조회할 지역")');
    return;
  }
}

exports.ApiService = main;
