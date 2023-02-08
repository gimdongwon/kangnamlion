const full = '\u200b'.repeat(1000);

function main(msg, replier) {
  if (msg.includes('사전목록') || msg.includes('사전추가') || msg.includes('사전삭제')) {
    if (msg.includes('사전목록')) {
      let binanceFlag = msg.includes('바');

      let dict_data = binanceFlag ? callBinanceData() : callData();
      const keys = Object.keys(dict_data);
      let result = '';
      for (let i = 0; i < keys.length; i += 1) {
        result += keys[i] + ' : ' + dict_data[keys[i]];
        if (i !== keys.length - 1) {
          result += '\n';
        }
      }
      replier.reply((binanceFlag ? '바' : '') + '사전목록\n' + full + result);
      return;
    }
    const msgSplit = msg.split(' ');
    const cmd = msgSplit[0],
      key = msgSplit[1],
      value = msgSplit[2];
    if (cmd.includes('사전추가')) {
      let binanceFlag = cmd.includes('바');
      if (key.length && value.length) {
        let dict_data = binanceFlag ? callBinanceData() : callData();
        dict_data[key] = value;
        FileStream.write(
          binanceFlag ? 'sdcard/msgbot/binanceDict.json' : 'sdcard/msgbot/dict.json',
          JSON.stringify(dict_data)
        );
        replier.reply(key + ' ' + (binanceFlag ? '바' : '') + '사전추가 완료');
      }
      return;
    }
    if (cmd.includes('사전삭제')) {
      let binanceFlag = cmd.includes('바');
      let dict_data = binanceFlag ? callBinanceData() : callData();
      if (delete dict_data[key]) {
        FileStream.write(
          binanceFlag ? 'sdcard/msgbot/binanceDict.json' : 'sdcard/msgbot/dict.json',
          JSON.stringify(dict_data)
        );
        replier.reply(key + '가 삭제되었습니다.');
      }
      return;
    }
  }
}

function callData() {
  return JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
}
function callBinanceData() {
  return JSON.parse(FileStream.read('sdcard/msgbot/binanceDict.json'));
}

exports.ApiService = main;
