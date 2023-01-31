/* 에러 객체 정의
{
  sender,
  time,
  error,
}
*/
/* error 보고 함수
 error가 발생하면 나에게 메시지를 보내어
 error 발생을 파악할 수 있도록 만들기.
 error 시점, error 발생 메시지, error발생 채팅방, error 유도 사용자
 what=error, who , when, where, how, ~~why~~
 who
 when
 where
 how
*/
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

// function getErrorList() {
//   let database = DataBase.getDataBase('Error.json');
//   if (isNull(database) || database == '[]') database = DataBase.setDataBase('Error.json', JSON.stringify(database));
//   return database;
// }

// function getRecordList() {
//   let database = DataBase.getDataBase('Record.json');
//   if (isNull(database) || database == '[]') database = DataBase.setDataBase('Record.json', JSON.stringify(database));
//   return database;
// }

// function callError(error) {
//   const errorList = JSON.parse(getErrorList());
//   errorList.push({ error });

//   const strError = JSON.stringify(errorList);
//   DataBase.setDataBase('Error.json', strError);
// }

// /*
//   어떤 방에 누가 가장 어떤 명령어를 가장 많이 호출했는지 표기
//   {
//     roomName,
//     userName,
//     callTime,
//     command
//   }
// */

// export function addRecord(record) {
//   const records = JSON.parse(getRecordList());
//   records.push(record);
//   const strRecords = JSON.stringify(records);
//   DataBase.setDataBase('Record.json', strRecords);
// }
