function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (sender === '용키') return;
  if (msg === '로또') {
    const data = org.jsoup.Jsoup.connect(
      'https://search.naver.com/search.naver?ie=UTF-8&query=%EB%A1%9C%EB%98%90%EB%B2%88%ED%98%B8&sm=chr_hty',
    ).get();
    let date = data.select('div.select_tab').text();
    date = date.split(' 이전 회차 다음 회차')[0];
    const numbers = data.select('div.winning_number').text();
    const plusNum = data.select('div.bonus_number').text();

    replier.reply(`${date} \n\n\n${numbers} +${plusNum}`);
  } else if (msg === '로또추천') {
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
    replier.reply(`추천번호 : ${lottos.join(', ')}\n보너스번호 + ${bonusNum}`);
  } else if (msg.startsWith('내로또')) {
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
