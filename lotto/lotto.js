function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (msg === '/로또') {
    let data = org.jsoup.Jsoup.connect('https://m.search.naver.com/search.naver?query=로또').get();
    let day = data.select('span.select_txt');
    day = day.text();
    let date = data.select('div.lot_date');
    date = date.select('dd').text().replace('1년', '');
    let plusNum = data.select('div.plus_num');
    plusNum = plusNum.select('span');

    data = data.select('div.lot_num');
    data = data.select('li');
    replier.reply(`${date + day} \n${data.text()} +${plusNum.text()}`);
  } else if (msg === '/로또추천') {
    const lottos = [];
    for (let i = 0; i < 7; i++) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (lottos.includes(num)) {
        i--;
      } else {
        lottos.push(num);
      }
    }
    const bonusNum = lottos.pop();
    replier.reply(`추천번호 : ${lottos.join(', ')} + ${bonusNum}`);
  } else if (msg.startsWith('/내로또')) {
    const numbers = msg.split(' ');
    numbers.shift();
    let data = org.jsoup.Jsoup.connect('https://m.search.naver.com/search.naver?query=로또').get();
    let plusNum = data.select('div.plus_num');
    plusNum = plusNum.select('span').text();

    data = data.select('div.lot_num');
    data = data.select('li');

    data = data.text().split(' ');
    data.push(plusNum);
    // price logic
    let result = 0;
    for (let i = 0; i < 6; i++) {
      if (data.indexOf(numbers[i]) > -1) {
        result += 1;
      }
    }
    data.pop();
    let out_text = '';
    out_text += `내 로또번호 \n${numbers}\n`;

    out_text += `이번주 당첨번호 \n${data} +${plusNum}\n\n`;
    out_text += `번호가 ${result}개 일치합니다.(플러스번호 일수도 있습니다)`;

    replier.reply(out_text);
  }
}
