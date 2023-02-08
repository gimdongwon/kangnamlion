let path = 'sdcard/채팅한 사람/';

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg) {
    FileStream.append(
      path +
        new Date().getFullYear() +
        '년 ' +
        (new Date().getMonth() + 1) +
        '월 ' +
        new Date().getDate() +
        '일/' +
        room +
        '/' +
        sender +
        '.txt',
      '1'
    );
  }
  if (msg == '말한사람') {
    let date = new Date().getFullYear() + '년 ' + (new Date().getMonth() + 1) + '월 ' + new Date().getDate() + '일';
    var lists = Array.from(new java.io.File(path + date + '/' + room).listFiles())
      .join('\n')
      .replace(/sdcard\/채팅한 사람\/|\.txt/g, '')
      .split(date + '/' + room + '/')
      .join('');
    replier.reply('[오늘 이 방에서 말한 사람 목록입니다]\n' + '\u200b'.repeat(500) + '\n' + lists);
  }
}
