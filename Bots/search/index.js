const full = '\u200b'.repeat(1000);

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  if (msg !== '실검') {
    return;
  }

  const data = org.jsoup.Jsoup.connect('http://rank.ezme.net/').get();
  const search = data.select('div.main-card > div.mdl-card__actions > h4 > a > b');

  let result = `실시간 검색순위\n\n${full}`;
  for (let i = 0; i < search.length; i += 1) {
    result += `${i + 1} ${search[i].text()}\n`;
  }
  result += '\nezme 순위기록 검색어 사용';

  replier.reply(result);
}
