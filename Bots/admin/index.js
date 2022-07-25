const scriptName = 'admin';

const DFLT_ADMIN = [{ name: '김동원' }, { name: '김승갑' }];

let RoomList = [];

function checkRoom(room) {
  let new_flag = 1;
  for (let idx in RoomList) {
    if (RoomList[idx] == room) new_flag = 0;
  }
  if (new_flag) RoomList.push(room);
}
function showRooms() {
  let rtn_msg = '[방 리스트]';
  for (let idx in RoomList) rtn_msg = rtn_msg.concat('\n ' + RoomList[idx]);
  return rtn_msg;
}

function isNull(value) {
  return typeof value == 'undefined' || value == null || value == '' ? true : false;
}

function getAdminList() {
  let database = DataBase.getDataBase('AdminList.json');
  if (isNull(database) || database == '[]')
    database = DataBase.setDataBase('AdminList.json', JSON.stringify(DFLT_ADMIN));
  return database;
}

// 관리자 조회
function getAdminText() {
  let AdminList = JSON.parse(getAdminList());
  let text = '';
  for (let idx in AdminList) text = text.concat(AdminList[idx]['name'] + '\n');
  return text.slice(0, -1);
}

// 관리자 추가
function addAdmin(name) {
  let AdminList = JSON.parse(getAdminList());
  for (let idx in AdminList) {
    if (AdminList[idx]['name'] == name) return -1; // already exist
  }
  AdminList.push({ name: name });
  DataBase.setDataBase('AdminList.json', JSON.stringify(AdminList));
  return 0; // success
}

// 관리자 제거
function delAdmin(name) {
  let AdminList = JSON.parse(getAdminList());
  for (let idx in AdminList) {
    if (AdminList[idx]['name'] == name) {
      AdminList.splice(idx, 1);
      DataBase.setDataBase('AdminList.json', JSON.stringify(AdminList));
      return 0; // success
    }
  }
  return -1; // not exist
}

// 관리자 확인
function isAdmin(name) {
  let AdminList = JSON.parse(getAdminList());
  for (let idx in AdminList) {
    if (AdminList[idx]['name'] == name) return 1; // is admin
  }
  return 0; // isn't admmin
}

function help() {
  let help_msg = '[관리자 도움말]';
  help_msg = help_msg.concat('\n*도움말');
  help_msg = help_msg.concat('\n*디바이스 상태');
  help_msg = help_msg.concat('\n');
  help_msg = help_msg.concat('\n*방');
  help_msg = help_msg.concat('\n*상태');
  help_msg = help_msg.concat('\n*재컴파일');
  help_msg = help_msg.concat('\n*구동 bot1 ...');
  help_msg = help_msg.concat('\n*중지 bot2 ...');
  help_msg = help_msg.concat('\n');
  help_msg = help_msg.concat('\n*관리자 조회');
  help_msg = help_msg.concat('\n*관리자 추가 admin1 ...');
  help_msg = help_msg.concat('\n*관리자 제거 admin1 ...');
  help_msg = help_msg.concat('\n');
  help_msg = help_msg.concat('\n*공지\n공지할 방이름\n하고싶은말');
  return help_msg;
}

function botStatus() {
  let stat_msg = '';
  let scripts = Api.getScriptNames();
  for (let idx in scripts) {
    stat_msg = stat_msg.concat('[' + scripts[idx] + ' 봇 상태]');
    stat_msg = stat_msg.concat('\n 전원 상태 : ' + Api.isOn(scripts[idx]));
    stat_msg = stat_msg.concat('\n 컴파일 완료 : ' + Api.isCompiled(scripts[idx]));
    stat_msg = stat_msg.concat('\n 컴파일 진행중 : ' + Api.isCompiling(scripts[idx]));
    stat_msg = stat_msg.concat('\n\n');
  }
  return stat_msg.slice(0, -2);
}

function deviceStatus() {
  let stat_msg = '[디바이스 상태]';
  stat_msg = stat_msg.concat('\n안드로이드 OS빌드 : ' + Device.getBuild());
  stat_msg = stat_msg.concat('\n안드로이드 버전코드 : ' + Device.getAndroidVersionCode());
  stat_msg = stat_msg.concat('\n안드로이드 버전이름 : ' + Device.getAndroidVersionCode());
  stat_msg = stat_msg.concat('\n휴대폰 브랜드명 : ' + Device.getPhoneBrand());
  stat_msg = stat_msg.concat('\n휴대폰 모델명 : ' + Device.getPhoneModel());
  stat_msg = stat_msg.concat('\n');
  stat_msg = stat_msg.concat('\n충전 여부 : ' + Device.isCharging());
  stat_msg = stat_msg.concat('\n충전기 타입 : ' + Device.getPlugType());
  stat_msg = stat_msg.concat('\n배터리 잔량 : ' + Device.getBatteryLevel() + '%');
  stat_msg = stat_msg.concat('\n배터리 온도 : ' + Device.getBatteryTemperature());
  stat_msg = stat_msg.concat('\n배터리 전압 : ' + Device.getBatteryVoltage() + 'mV');
  stat_msg = stat_msg.concat('\n배터리 상태 : ' + Device.getBatteryStatus());
  stat_msg = stat_msg.concat('\n배터리 건강상태 : ' + Device.getBatteryHealth());
  return stat_msg;
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  checkRoom(room);
  if (!isAdmin(sender)) return; // sedner가 관리자가 아닐 경우, 종료

  if (msg == '*도움말') replier.reply(help());

  if (msg == '*디바이스 상태') replier.reply(deviceStatus());

  if (msg.indexOf('*공지') == 0) {
    let contents = msg.replace('*공지', '').trim();
    if (isNull(contents)) {
      replier.reply('ex) *공지\n디버그룸\n테스트 메시지 입니다.');
    } else {
      let room_name = contents.split('\n')[0]; // 공백이 오기 전 문자열
      let notice = contents.substring(contents.indexOf('\n') + 1); // 공백 다음 문자열
      replier.reply(room_name, notice);
    }
  }
  // 방 확인
  if (msg == '*방') replier.reply(showRooms());

  // 스크립트 상태 확인
  if (msg == '*상태') replier.reply(botStatus());

  // 스크립트 재컴파일
  if (msg.indexOf('*재컴파일') == 0) {
    let contents = msg.replace('*재컴파일', '').trim();
    if (isNull(contents)) {
      Api.reload();
      replier.reply('전체 스크립트가 재컴파일되었습니다.');
    } else {
      let scripts = contents.split(' ');
      for (let idx in scripts) {
        if (!isNull(scripts[idx])) {
          Api.reload(scripts[idx]);
          replier.reply(scripts[idx] + '(이)가 재컴파일되었습니다.');
        }
      }
    }
  }

  // 스크립트 구동
  if (msg.indexOf('*구동') == 0) {
    let contents = msg.replace('*구동', '').trim();
    if (isNull(contents)) {
      Api.on();
      replier.reply('전체 스크립트가 구동되었습니다.');
    } else {
      let scripts = contents.split(' ');
      for (let idx in scripts) {
        if (!isNull(scripts[idx])) {
          Api.on(scripts[idx]);
          replier.reply(scripts[idx] + '(이)가 구동되었습니다.');
        }
      }
    }
  }

  // 스크립트 중지
  if (msg.indexOf('*중지') == 0) {
    let contents = msg.replace('*중지', '').trim();
    if (isNull(contents)) {
      Api.off();
      replier.reply('전체 스크립트가 중지되었습니다.');
    } else {
      let scripts = contents.split(' ');
      for (let idx in scripts) {
        if (!isNull(scripts[idx])) {
          Api.off(scripts[idx]);
          replier.reply(scripts[idx] + '(이)가 중지되었습니다.');
        }
      }
    }
  }

  // 관리자 관리
  if (msg == '*관리자 조회') replier.reply('[관리자 리스트]\n' + getAdminText());

  if (msg.indexOf('*관리자 추가') == 0) {
    let contents = msg.replace('*관리자 추가', '').trim();
    if (isNull(contents)) {
      replier.reply('ex) *관리자 추가 admin1 admin2');
      return;
    }
    let admins = contents.split(' ');
    for (let idx in admins) {
      if (!isNull(admins[idx])) {
        if (addAdmin(admins[idx]) < 0) {
          replier.reply(admins[idx] + '님은 이미 추가된 관리자입니다.');
        } else {
          replier.reply(admins[idx] + '님을 관리자로 추가했습니다.');
        }
      }
    }
  }

  if (msg.indexOf('*관리자 제거') == 0) {
    let contents = msg.replace('*관리자 제거', '').trim();
    if (isNull(contents)) {
      replier.reply('ex) *관리자 제거 admin1 admin2');
      return;
    }
    let admins = contents.split(' ');
    for (let idx in admins) {
      if (!isNull(admins[idx])) {
        if (delAdmin(admins[idx]) < 0) {
          replier.reply(admins[idx] + '님은 관리자가 아닙니다.');
        } else {
          replier.reply(admins[idx] + '님을 관리자에서 제거했습니다.');
        }
      }
    }
  }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  let textView = new android.widget.TextView(activity);
  textView.setText('Hello, World!');
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
