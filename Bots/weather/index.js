const {KakaoLinkClient} = require('kakaolink');

const {KAKAO_CLIENT_KEY, KAKAO_ID, KAKAO_PASSWORD} = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const Kakao = new KakaoLinkClient(KAKAO_CLIENT_KEY, 'https://developers.kakao.com');
Kakao.login(KAKAO_ID, KAKAO_PASSWORD);

const ERROR = '지원되지 않는 지역입니다. (ex. 날씨 서울)';

function response(room, msg, sender, isGroupChat, replier) {
  if (sender === '용키') {
    return;
  }

  if (!msg.startsWith('날씨 ')) {
    return;
  }

  const region = msg.slice(3);
  try {
    if (!Number.isNaN(region)) {
      throw ERROR;
    }

    const html = org.jsoup.Jsoup.connect(`https://www.google.com/search?q=${region} 날씨`).get();
    const status = html.select('#wob_dc').text();
    if (status === '') {
      throw ERROR;
    }

    const image = `http:${html.select('#wob_tci').attr('src')}`;
    const precipitation = html.select('#wob_pp').text();
    const temperature = html.select('#wob_tm').text();
    const wind = html.select('#wob_ws').text();
    const humidity = html.select('#wob_hm').text();

    Kakao.sendLink(room, {
      template_id: 79058,
      template_args: {
        image,
        region,
        status,
        precipitation,
        temperature,
        wind,
        humidity,
      },
    });
  } catch (e) {
    replier.reply(e);
  }
}
