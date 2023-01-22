const full = '\u200b'.repeat(1000);

function main(replier) {
  let data = org.jsoup.Jsoup.connect('http://rank.ezme.net/').get();

  const searchDatas = data.select('div.main-card > div.mdl-card__actions > h4 > a > b');
  let result = '실시간 검색순위\n\n' + full;
  if (!searchDatas) {
    return;
  }
  for (let i = 0; i < searchDatas.length; i++) {
    result += i + 1 + ' ' + searchDatas[i].text() + '\n';
  }
  result += '\nezme 순위기록 검색어 사용';
  replier.reply(result);
}
