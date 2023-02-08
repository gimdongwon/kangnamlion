function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if (msg.includes('내일')) {
    var daya = new Date();

    var lh1 = 24 - daya.getHours();

    var lh2 = 23 - daya.getHours();

    var lm1 = 60 - daya.getMinutes();

    var lm2 = 59 - daya.getMinutes();

    var ls1 = 60 - daya.getSeconds();

    if (daya.getSeconds() == 0) {
      if (daya.getMinutes() == 0) {
        replier.reply('내일까지 ' + lh1 + '시간 0분 0초 남았습니다.');
      } else {
        replier.reply('내일까지 ' + lh2 + '시간 ' + lm1 + '분 0초 남았습니다.');
      }
    } else {
      replier.reply('내일까지 ' + lh2 + '시간 ' + lm2 + '분 ' + ls1 + '초 남았습니다.');
    }
  }
}
