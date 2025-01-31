function main(msg, sender, replier, room, useKakaoLink, useError) {
  const region = msg.slice(3).trim();

  if (region) {
    try {
      // 네이버 검색을 통한 날씨 데이터 가져오기
      let url = org.jsoup.Jsoup.connect('https://search.naver.com/search.naver?query=' + region + ' 날씨').get();

      let resultDC = url.select('.before_slash').text(); // 날씨 상태
      let resultTM = url.select('.temperature_text').text(); // 온도
      let resultSummary = url.select('.summary_list > div.sort').text(); // 기상 요약

      // 🌡️ 온도 숫자만 추출
      let temperatureMatch = resultTM.match(/[-\d.]+/g);
      let temperature = temperatureMatch ? temperatureMatch[0] : 'N/A';

      // 🌤 날씨 요약 데이터 분리 (체감온도, 강수량, 습도, 풍속)
      let feelsLike = resultSummary.match(/체감\s*([-.\d]+)/)
        ? resultSummary.match(/체감\s*([-.\d]+)/)[1] + '℃'
        : '정보 없음';
      let precipitation = resultSummary.match(/강수\s*([\d.]+mm)/)
        ? resultSummary.match(/강수\s*([\d.]+mm)/)[1]
        : '0mm';
      let humidity = resultSummary.match(/습도\s*(\d+%)/) ? resultSummary.match(/습도\s*(\d+%)/)[1] : '정보 없음';
      let wind = resultSummary.match(/([가-힣]+풍\s*[\d.]+m\/s)/)
        ? resultSummary.match(/([가-힣]+풍\s*[\d.]+m\/s)/)[1]
        : '정보 없음';

      // 📌 최종 메시지 (일반 문자열 연결 방식 사용)
      let text = '📍 ' + region + '의 날씨 🌡\n\n';
      text += '🌤 상태: ' + resultDC + '\n';
      text += '🌡 온도: ' + temperature + '℃\n\n';
      text += '📊 체감온도: ' + feelsLike + '\n';
      text += '💧 강수량: ' + precipitation + '\n';
      text += '💦 습도: ' + humidity + '\n';
      text += '💨 풍속: ' + wind + '\n\n';
      text += '💡 좋은 하루 보내세요! ☀️❄️💨💧';

      replier.reply(text);
    } catch (e) {
      replier.reply('❌ 불러올 수 없는 지역이거나 지원되지 않는 지역입니다.');
      useError(msg, sender, room, e);
    }
  } else {
    replier.reply("❌ 지역을 입력하세요! 예: '날씨 서울' 또는 '날씨 New York'");
  }
}

exports.ApiService = main;
