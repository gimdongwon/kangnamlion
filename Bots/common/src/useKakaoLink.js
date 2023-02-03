const env = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient(env['KAKAO_CLIENT_KEY'], 'https://developers.kakao.com');
Kakao.login(env['KAKAO_ID'], env['KAKAO_PASSWORD']); // 카카오 계정 아이디와 비밀번호

const main = (roomName, replier, data, text) => {
  Kakao.sendLink(roomName, data).then((res) => {
    if (res.status === 400) {
      replier.reply(text);
    }
  });
};

exports.main = main;
