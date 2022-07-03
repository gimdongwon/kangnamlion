let dict_data = callData();

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  const msgSplit = msg.split(' ');
  const cmd = msgSplit[0];
  const key = msgSplit[1];
  const value = msgSplit[2];
  if (cmd === '사전추가') {
    dict_data = callData();
    dict_data[key] = value;

    FileStream.write('sdcard/msgbot/dict.json', JSON.stringify(dict_data));
    replier.reply(`${key} 사전추가 완료`);
  } else if (cmd === '사전목록') {
    const obj = Object.keys(dict_data);
    let result = '';
    for (let i = 0; i < obj.length; i += 1) {
      result += `${obj[i]} : ${dict_data[obj[i]]}`;
      if (i !== obj.length - 1) {
        result += '\n';
      }
    }
    replier.reply(result);
  }
}

function callData() {
  return JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
}
