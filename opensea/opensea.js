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
      const result = opensea_func(symbol);
      let output_text = '';
      output_text += 'nft opensea 조회 \n';
      output_text += `이름 : ${symbol}\n`;
      output_text
        += `바닥가 : ${
          result.collection.stats.floor_price.toFixed(2)
        } ${
          result.collection.payment_tokens[0].symbol
        }\n`;
      // output_text += '이미지 url (카카오 링크로 그림 추가 예정): ' + result.collection['banner_image_url'] + '\n';
      output_text += `하루 거래량 : ${result.collection.stats.one_day_volume.toFixed(2)}`;
      replier.reply(output_text);
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

function opensea_func(opensea_symbol) {
  const opensea_url = `https://api.opensea.io/api/v1/collection/${opensea_symbol}`;
  return JSON.parse(org.jsoup.Jsoup.connect(opensea_url).ignoreContentType(true).get().text());
}
