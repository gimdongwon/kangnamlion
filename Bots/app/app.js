const {
  getWeather,
  getPopularSearch,
  getLotto,
  myDictFunction,
  getKimchiPrimium,
  getCovid19,
  translate,
  opensea,
  chart,
  calculate,
  binance,
  bithumb,
  upbit,
  invest,
  news,
  walk,
  gas,
  exchange,
} = require('ApiService');
const { useKakaoLink, useError } = require('common');

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  if (
    [
      '주식 ',
      '업 ',
      '빗 ',
      '바 ',
      '계산 ',
      '차트 ',
      '옾 ',
      '날씨 ',
      '뜻 ',
      '코로나',
      '김프',
      '실검',
      '로또',
      '사전',
      '뉴스',
      'ㅋㅇㄷ',
      '기위',
      '환율',
    ].filter((item) => msg.includes(item)).length === 0
  ) {
    return;
  }

  // 기록 용
  let botName = '';
  const commandData = JSON.parse(DataBase.getDataBase('CommandRecord.json'));
  const userData = JSON.parse(DataBase.getDataBase('UserRecord.json'));
  if (userData[sender]) {
    userData[sender] += 1;
  } else {
    userData[sender] = 1;
  }
  DataBase.setDataBase('UserRecord.json', JSON.stringify(userData));

  //   let result = '';
  //   result += '해당메시지: ' + msg;
  //   result += '\n보낸사람: ' + sender;
  //   result += '\n보낸시각: ' + new Date().toLocaleString('').replace('GMT+09:00', '');
  //   result += '\n보낸방: ' + room;

  //   Api.replyRoom('김동원', result);

  if (msg.startsWith('주식 ')) {
    invest(msg, sender, replier, room, useKakaoLink, useError);
    botName = 'invest';
  }

  if (msg.startsWith('업 ')) {
    upbit(msg, sender, replier, room, useKakaoLink, useError);
    botName = 'upbit';
  }

  if (msg.startsWith('빗 ')) {
    bithumb(msg, sender, replier, room, useKakaoLink, useError);
    botName = 'bithumb';
  }

  if (msg.startsWith('바 ')) {
    binance(msg, sender, replier, room, useError);
    botName = 'binance';
  }

  if (msg.startsWith('계산 ')) {
    calculate(msg, sender, replier, room, useError);
    botName = 'calculate';
  }

  if (msg.startsWith('차트 ')) {
    chart(msg, sender, replier, room, useKakaoLink, useError);
    botName = 'chart';
  }

  if (msg.startsWith('옾 ')) {
    replier.reply('opensea api 유료화로 조회 불가');
    return;
    opensea(msg, sender, replier, room, useKakaoLink, useError);
    botName = 'opensea';
  }

  if (msg.startsWith('날씨 ')) {
    getWeather(msg, sender, replier, room, useKakaoLink, useError);
    botName = 'invest';
  }

  if (msg.startsWith('뜻 ')) {
    translate(msg, sender, replier, room, useError);
    botName = 'translate';
  }

  if (msg.startsWith('코로나')) {
    getCovid19(msg, replier);
    botName = 'covid19';
  }

  if (msg === '김프') {
    getKimchiPrimium(replier);
    botName = 'kimchiPrimium';
  }

  if (msg === '실검') {
    getPopularSearch(replier);
    botName = 'popularSearch';
  }

  if (msg.includes('로또')) {
    getLotto(msg, replier);
    botName = 'lotto';
  }

  if (msg.includes('사전')) {
    myDictFunction(msg, replier);
    botName = 'myDictFunction';
  }
  if (msg.includes('뉴스 ')) {
    news(msg, replier);
    botName = 'news';
  }
  if (msg === 'ㅋㅇㄷ') {
    walk(replier);
    botName = 'walk';
  }
  if (msg === '기위') {
    gas(replier);
    botName = 'gas';
  }
  if (msg === '환율') {
    exchange(replier);
    botName = 'exchange';
  }

  if (commandData[botName]) {
    commandData[botName] += 1;
  } else {
    commandData[botName] = 1;
  }
  DataBase.setDataBase('CommandRecord.json', JSON.stringify(commandData));
}
