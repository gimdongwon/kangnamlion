function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  const importFn = (botName, req) => {
    if (botName && req !== '') {
      return Bridge.getScopeOf(botName).main(msg, sender, replier, room, req);
    }
  };
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
    //   let result = '';
    //   result += '해당메시지: ' + msg;
    //   result += '\n보낸사람: ' + sender;
    //   result += '\n보낸시각: ' + new Date().toLocaleString('').replace('GMT+09:00', '');
    //   result += '\n보낸방: ' + room;

    //   Api.replyRoom('김동원', result);
    if (msg.startsWith('주식 ')) {
      const symbol_invest = msg.slice(3);
      importFn('invest', symbol_invest);
      return;
    }

    if (msg.startsWith('업 ')) {
      const symbol_upbit = msg.slice(2);
      importFn('upbit', symbol_upbit);
      return;
    }

    if (msg.startsWith('빗 ')) {
      const symbol_bithumb = msg.slice(2);
      importFn('bithumb', symbol_bithumb);
      return;
    }

    if (msg.startsWith('바 ')) {
      const symbol_binance = msg.slice(2);
      importFn('binance', symbol_binance);
      return;
    }

    if (msg.startsWith('계산 ')) {
      const target = msg.slice(3);
      importFn('calculate', target);
      return;
    }

    if (msg.startsWith('차트 ')) {
      const target_chart = msg.slice(3);
      importFn('chart', target_chart);
      return;
    }

    if (msg.startsWith('옾 ')) {
      const symbol_opensea = msg.slice(2);
      importFn('opensea', symbol_opensea);
      return;
    }

    if (msg.startsWith('날씨 ')) {
      const region = msg.slice(3);
      importFn('weather', region);
      return;
    }

    if (msg.startsWith('뜻 ')) {
      const word = msg.slice(2);
      importFn('translate', word);
      return;
    }

    if (msg.startsWith('코로나')) {
      importFn('covid19', msg);
      return;
    }

    if (msg === '김프') {
      importFn('kimchi_premium');
      return;
    }

    if (msg === '실검') {
      importFn('search');
      return;
    }

    if (msg.includes('로또')) {
      importFn('lotto', msg);
      return;
    }

    if (msg.includes('사전')) {
      importFn('dictionary', msg);
      return;
    }

    if (msg === '사자설명서') {
      replier.reply('https://taltube.tistory.com/41');
      return;
    }
  }
}
