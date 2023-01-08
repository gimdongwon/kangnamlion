function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  if (msg.startsWith('뜻 ')) {
    try {
      let word = msg.slice(2);
      if (word.length === '' || word === '') {
        replier.reply('올바른 단어 입력해주세요');
        return;
      }
      let data = org.jsoup.Jsoup.connect('https://m.search.daum.net/search?q=' + word + '+뜻').get();
      let means = data.select('div.wrap_mean');

      if (means[0] === undefined) {
        replier.reply('올바른 단어 입력해주세요');
        return;
      }
      let result = '';
      result += word + '의 뜻' + '\n\n';
      for (let i = 0; i < means.length; i++) {
        result += means[i].text().replace(' ', '. ');
        if (i !== means.length - 1) {
          result += '\n';
        }
      }
      replier.reply(result);
    } catch (error) {
      replier.reply(error);
    }
  }
}
