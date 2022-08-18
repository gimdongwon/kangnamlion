const {KakaoLinkClient} = require('kakaolink');

const {KAKAO_CLIENT_KEY, KAKAO_ID, KAKAO_PASSWORD} = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const Kakao = new KakaoLinkClient(KAKAO_CLIENT_KEY, 'https://developers.kakao.com');
Kakao.login(KAKAO_ID, KAKAO_PASSWORD);

function upbit(symbol) {
  const url = `https://api.upbit.com/v1/ticker?markets=KRW-${symbol}`;
  return JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
}

function comma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (sender === '용키') {
    return;
  }

  if (!msg.startsWith('업 ')) {
    return;
  }

  const arr = msg.split(' ');
  if (arr.length < 2) {
    return;
  }

  const dict = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  const keyword = dict[arr[1]] || arr[1];

  try {
    const krw = JSON.parse(
      org.jsoup.Jsoup.connect('https://api.upbit.com/v1/market/all').ignoreContentType(true).get().text(),
    );

    let symbol = '';
    for (const data of krw) {
      const replace = data.korean_name.replace(/(<([^>]+)>)/gi, ' ');

      if (replace === keyword) {
        symbol = data.market.replace(/(<([^>]+)>)/gi, ' ').split('-')[1].toUpperCase();
        break;
      }
    }

    const json = upbit(symbol);
    Kakao.sendLink(
      isGroupChat ? room : sender,
      {
        template_id: 77428,
        template_args: {
          upbit_coin_symbol: symbol,
          now_price: comma(json[0].trade_price),
          percent: (json[0].signed_change_rate * 100).toFixed(2),
          max_price: comma(json[0].high_price),
          min_price: comma(json[0].low_price),
          finish_price: comma(json[0].prev_closing_price),
          trade_volume: comma(json[0].acc_trade_volume_24h.toFixed(2)),
        },
      },
      'custom',
    );
  } catch (e) {
    replier.reply(e);
  }
}
