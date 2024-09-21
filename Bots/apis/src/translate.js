function main(msg, sender, replier, room, useError) {
  const word = msg.slice(2);
  try {
    if (word.length === '' || word === '') {
      replier.reply('올바른 단어 입력해주세요');
      return;
    }
    const data = org.jsoup.Jsoup.connect('https://m.search.daum.net/search?q=' + word + '+뜻').get();
    const means = data.select('div.wrap_mean');

    if (means[0] === undefined) {
      replier.reply('올바른 단어 입력해주세요');
      return;
    }
    let result = word + '의 뜻' + '\n\n';

    for (let i = 0; i < means.length; i++) {
      result += means[i].text().replace(' ', '. ');
      if (i !== means.length - 1) {
        result += '\n';
      }
    }

    replier.reply(result);
  } catch (error) {
    replier.reply('에러가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    useError(msg, sender, room, e);
  }
}
exports.ApiService = main;
