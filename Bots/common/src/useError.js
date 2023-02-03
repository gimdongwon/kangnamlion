function replyError(msg, sender, room, e) {
  let result = '[ 오류발생🚨  ]\n\n';
  result += '오류 이름: ' + e.name;
  result += '\n오류 메시지: ' + e.message;
  result += '\n오류 위치: ' + e.lineNumber;
  result += '\n\n해당메시지: ' + msg;
  result += '\n보낸사람: ' + sender;
  result += '\n보낸시각: ' + new Date().toLocaleString('').replace('GMT+09:00', '');
  result += '\n보낸방: ' + room;

  Api.replyRoom('김동원', result);
}

exports.main = replyError;
