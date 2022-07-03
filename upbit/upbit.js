const { KakaoLinkClient } = require('kakaolink');

const Kakao = new KakaoLinkClient(KAKAO_CLIKENT_KEY, 'https://developers.kakao.com');
Kakao.login(KAKAO_ID, KAKAO_PASSWORD); // 카카오 계정 아이디와 비밀번호

const dict = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (sender === '용키') return;
  const arr = msg.split(' ');
  let splited = arr[1];
  if (Object.keys(dict).indexOf(splited) > -1) {
    splited = dict[splited];
  }
  // /* 업비트 코인가격 */
  if (msg.startsWith('업 ')) {
    if (!isGroupChat) {
      room = sender;
    }
    try {
      let symbol = '';
      if (arr.length !== 1) {
        // symbol = splited;
        const krw = JSON.parse(
          org.jsoup.Jsoup.connect('https://api.upbit.com/v1/market/all').ignoreContentType(true).get().text(),
        );
        // let data = org.jsoup.Jsoup.connect('https://upbit.com/exchange?code=CRIX.UPBIT.KRW-BTC').get();
        for (const i in krw) {
          const keywordData = krw[i];
          const keywordData_replaced = keywordData.korean_name.replace(/(<([^>]+)>)/gi, ' ');
          if (keywordData_replaced === splited) {
            symbol = keywordData.market.replace(/(<([^>]+)>)/gi, ' ').split('-')[1];
          }
        }
      }
      symbol = symbol.toUpperCase();
      const json = upbit(symbol);
      let output = '';
      output += '[UPBIT API]\n';
      output += `<${symbol}/KRW>\n`;
      output
        += `${comma(`현재가 ${json[0].trade_price}`)
        } (${
          (json[0].signed_change_rate * 100).toFixed(2)
        }%)\n\n`;
      output += `24H 고가 : ${comma(json[0].high_price)} KRW\n`;
      output += `24H 저가 : ${comma(json[0].low_price)} KRW\n`;
      output += `24H 종가 : ${comma(json[0].prev_closing_price)} KRW\n`;
      output
        += `24H 거래량 : ${comma(json[0].acc_trade_volume_24h.toFixed(2))} ${symbol}`;

      Kakao.sendLink(
        room,
        {
          template_id: 77428,
          template_args: {
            symbol,
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
      /*
      if(!isGroupChat){room=sender;}
      room = room.replace(/,/g,", ");
      Kakao.sendLink(room,{
        template_id: 75135,
        template_args: {}
      }, 'custom');
      */
      //   replier.reply(output);

      // replier.reply(d);
    } catch (error) {
      replier.reply(`해당 코인이 존재하지 않습니다\n${error}`);
    }
  }
}
/* 업비트 JSON 함수 */

function upbit(symbol) {
  let url = 'https://api.upbit.com/v1/ticker?markets=KRW-';
  url += symbol;
  return JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
}
/* 화폐단위 컴마출력 */

function comma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
