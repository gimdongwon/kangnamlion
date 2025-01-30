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
    const feer = org.jsoup.Jsoup.connect('https://coinmarketcap.com/ko/charts/bitcoin-dominance')
      .get()
      .select('a.cmc-link')
      .get(58)
      .text();
    replier.reply(feer);
    return;
  }
}
