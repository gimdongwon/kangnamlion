function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  const targetArray = ['가즈아', '가보자', '가주아'];
  for (let i = 0; i < targetArray.length; i++) {
    if (msg.includes(targetArray[i])) {
      const answerArr = ['가즈아 😎', '가보자고 🦁', '가보자구 🔥'];
      Math.floor(Math.random() * answerArr.length);
      replier.reply(answerArr[Math.floor(Math.random() * answerArr.length)]);
      return;
    }
  }
  if (msg === '사자설명서') {
    replier.reply('https://taltube.tistory.com/41');
    return;
  }
  if (msg === '탐욕') {
    try {
      const fearGreedIndex = org.jsoup.Jsoup.connect('https://coinmarketcap.com/ko/charts/bitcoin-dominance')
        .get()
        .select('a.cmc-link')
        .get(59)
        .text();

      let result = '📊 【공포 & 탐욕 지수】\n\n';

      // 공포 & 탐욕 단계별 해석
      const fearValue = parseInt(fearGreedIndex.split('/')[0], 10);

      if (fearValue >= 75) {
        result += '🚀 극단적 탐욕 (Extreme Greed) 🚀\n';
      } else if (fearValue >= 50) {
        result += '😃 탐욕 (Greed) 😃\n';
      } else if (fearValue >= 25) {
        result += '😨 공포 (Fear) 😨\n';
      } else {
        result += '😱 극단적 공포 (Extreme Fear) 😱\n';
      }

      result += '\n🔥 현재 지수: ' + fearGreedIndex + ' 🔥';

      replier.reply(result);
    } catch (error) {
      replier.reply('❌ 공포 & 탐욕 지수를 가져오는 중 오류 발생: ' + error.message);
    }
  }
}
