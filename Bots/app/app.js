function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  const importFn = (botName, req) => {
    if (botName && req !== '') {
      return Bridge.getScopeOf(botName).main(replier, room, req);
    }
  };
  if (msg.startsWith('주식 ')) {
    const symbol_invest = msg.slice(2);
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

  if (msg === '실검') {
    importFn('search');
    return;
  }

  if (msg === '사자설명서') {
    replier.reply('https://taltube.tistory.com/41');
    return;
  }
}
