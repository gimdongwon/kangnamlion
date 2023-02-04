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
      '사자설명서',
    ].filter((item) => msg.includes(item)).length > 0
  ) {
    // 기록 용

    //   const commandData = JSON.parse(DataBase.getDataBase('CommandRecord.json'));
    const userData = JSON.parse(DataBase.getDataBase('UserRecord.json'));
    if (userData[sender]) {
      userData[sender] += 1;
    } else {
      userData[sender] = 1;
    }
    DataBase.setDataBase('UserRecord.json', JSON.stringify(userData));
    //   if (commandData[botName]) {
    //     commandData[botName] += 1;
    //   } else {
    //     commandData[botName] = 1;
    //   }
    // DataBase.setDataBase('CommandRecord.json', JSON.stringify(commandData));

    //   let result = '';
    //   result += '해당메시지: ' + msg;
    //   result += '\n보낸사람: ' + sender;
    //   result += '\n보낸시각: ' + new Date().toLocaleString('').replace('GMT+09:00', '');
    //   result += '\n보낸방: ' + room;

    //   Api.replyRoom('김동원', result);

    if (msg.startsWith('주식 ')) {
      invest(msg, sender, replier, room, useKakaoLink, useError);
      return;
    }

    if (msg.startsWith('업 ')) {
      upbit(msg, sender, replier, room, useKakaoLink, useError);
      return;
    }

    if (msg.startsWith('빗 ')) {
      bithumb(msg, sender, replier, room, useKakaoLink, useError);
      return;
    }

    if (msg.startsWith('바 ')) {
      binance(msg, sender, replier, room, useError);
      return;
    }

    if (msg.startsWith('계산 ')) {
      calculate(msg, sender, replier, room, useError);
      return;
    }

    if (msg.startsWith('차트 ')) {
      chart(msg, sender, replier, room, useKakaoLink, useError);
      return;
    }

    if (msg.startsWith('옾 ')) {
      opensea(msg, sender, replier, room, useKakaoLink, useError);
      return;
    }

    if (msg.startsWith('날씨 ')) {
      getWeather(msg, sender, replier, room, useKakaoLink, useError);
      return;
    }

    if (msg.startsWith('뜻 ')) {
      translate(msg, sender, replier, room);
      return;
    }

    if (msg.startsWith('코로나')) {
      getCovid19(msg, replier);
      return;
    }

    if (msg === '김프') {
      getKimchiPrimium(replier);
      return;
    }

    if (msg === '실검') {
      getPopularSearch(replier);
      return;
    }

    if (msg.includes('로또')) {
      getLotto(msg, replier);
      return;
    }

    if (msg.includes('사전')) {
      myDictFunction(msg, replier);
      return;
    }

    if (msg === '사자설명서') {
      replier.reply('https://taltube.tistory.com/41');
      return;
    }
  }
  const targetArray = ['가즈', '가보자', '가주아'];
  for (let i = 0; i < targetArray.length; i++) {
    if (msg.includes(targetArray[i])) {
      const answerArr = ['가즈아 😎', '가보자고 🦁', '가보자구 🔥'];
      Math.floor(Math.random() * answerArr.length);
      replier.reply(answerArr[Math.floor(Math.random() * answerArr.length)]);
      return;
    }
  }
}
