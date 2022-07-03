const scriptName = 'opensea';
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  const koreanNameDict = {};
  if (msg.startsWith('옾')) {
    try {
      const temp = msg.split(' ');
      const symbol = temp[1];
      /* if (koreanNameDict[temp[1]]!==''){
        symbol = koreanNameDict[temp[1]];
      }
      */
      const result = opensea(symbol);
      let output = '';
      output += 'nft opensea 조회 \n';
      output += `이름 : ${symbol}\n`;
      output
        += `바닥가 : ${
          result.collection.stats.floor_price.toFixed(2)
        } ${
          result.collection.payment_tokens[0].symbol
        }\n`;
      // output += '이미지 url (카카오 링크로 그림 추가 예정): ' + result.collection['banner_image_url'] + '\n';
      output += `하루 거래량 : ${result.collection.stats.one_day_volume.toFixed(2)}`;
      replier.reply(output);
    } catch (error) {
      replier.reply(`호출 실패￦n${error}`);
    }
  }
  // if (msg.startsWith('사전')) {
  //   const temp2 = msg.split(' ');
  //   let engName = temp2[1],
  //     korName = temp2[2];
  //   koreanNameDict[korName] = engName;
  //   replier.reply('명령어 추가완료 ' + engName + ' ' + korName);
  // }
}

function opensea(symbole) {
  const url = `https://api.opensea.io/api/v1/collection/${symbole}`;
  return JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
}
