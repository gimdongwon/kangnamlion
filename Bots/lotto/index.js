function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (sender === '용키') {
    return;
  }

  if (msg === '로또') {
    const data = org.jsoup.Jsoup.connect(
      'https://search.naver.com/search.naver?ie=UTF-8&query=%EB%A1%9C%EB%98%90%EB%B2%88%ED%98%B8&sm=chr_hty',
    ).get();
    const date = data
      .select('div.select_tab')
      .text()
      .split(' 이전 회차 다음 회차')[0];

    const nums = data.select('div.winning_number').text();
    const bonus = data.select('div.bonus_number').text();

    replier.reply(`${date} \n\n\n${nums} + ${bonus}`);
    return;
  }

  if (msg === '로또추천') {
    const list = [];

    for (let i = 0; i < 7; i += 1) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (list.includes(num)) {
        i -= 1;
      } else {
        list.push(num);
      }
    }

    const bonus = list.pop();
    replier.reply(`추천번호 : ${list.join(', ')}\n보너스번호 + ${bonus}`);
    return;
  }

  if (msg.startsWith('내로또')) {
    const nums = msg.split(' ');
    nums.shift();

    const data = org.jsoup.Jsoup.connect('https://m.search.naver.com/search.naver?query=로또').get();
    const bonus = data
      .select('div.plus_num')
      .select('span')
      .text();

    const list = data
      .select('div.lot_num')
      .select('li')
      .text().split(' ');
    list.push(bonus);

    let result = 0;
    for (let i = 0; i < 6; i += 1) {
      if (list.indexOf(nums[i]) > -1) {
        result += 1;
      }
    }

    data.pop();

    let text = '';
    text += `내 로또번호 \n${nums}\n`;
    text += `이번주 당첨번호 \n${list} + ${bonus}\n\n`;
    text += `번호가 ${result}개 일치합니다.(플러스번호 일수도 있습니다)`;

    replier.reply(text);
  }
}
