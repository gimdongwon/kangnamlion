const env = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient(env['KAKAO_CLIENT_KEY'], 'https://developers.kakao.com');
Kakao.login(env['KAKAO_ID'], env['KAKAO_PASSWORD']); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (sender === '용키') return;
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));

  let str_split_Arr = msg.split(' ');
  let splited_data = str_split_Arr[1];
  if (Object.keys(dict_data).indexOf(splited_data) > -1) {
    splited_data = dict_data[splited_data];
  }

  // /* 업비트 코인가격 */
  if (msg.startsWith('업 ')) {
    if (!isGroupChat) {
      room = sender;
    }

    let upbit_coin_symbol = '';
    if (str_split_Arr.length != 1) {
      // upbit_coin_symbol = splited_data;
      let coin_symbol_krw = JSON.parse(
        org.jsoup.Jsoup.connect('https://api.upbit.com/v1/market/all').ignoreContentType(true).get().text()
      );
      // let data = org.jsoup.Jsoup.connect('https://upbit.com/exchange?code=CRIX.UPBIT.KRW-BTC').get();

      for (let i in coin_symbol_krw) {
        let keywordData = coin_symbol_krw[i];
        let keywordData_replaced = keywordData['korean_name'].replace(/(<([^>]+)>)/gi, ' ');
        if (keywordData_replaced == splited_data) {
          upbit_coin_symbol = keywordData['market'].replace(/(<([^>]+)>)/gi, ' ').split('-')[1];
        }
      }
    }
    if (upbit_coin_symbol === '') {
      return;
    }

    upbit_coin_symbol = upbit_coin_symbol.toUpperCase();
    let upbit_json = upbit_func(upbit_coin_symbol);
    const openingPrice = upbit_json[0]['opening_price'],
      maxPercent = (((openingPrice - upbit_json[0]['high_price']) / openingPrice) * 100 * -1).toFixed(2),
      minPercent = (((openingPrice - upbit_json[0]['low_price']) / openingPrice) * 100 * -1).toFixed(2);

    const template_args = {
      upbit_coin_symbol: upbit_coin_symbol,
      now_price: numberWithCommas(upbit_json[0].trade_price),
      percent: (upbit_json[0].signed_change_rate * 100).toFixed(2),
      max_price: numberWithCommas(upbit_json[0].high_price),
      min_price: numberWithCommas(upbit_json[0].low_price),
      finish_price: numberWithCommas(upbit_json[0].prev_closing_price),
      trade_volume: numberWithCommas(upbit_json[0].acc_trade_volume_24h.toFixed(2)),
      maxPercent: maxPercent,
      minPercent: minPercent,
    };

    sendKakao(room, template_args).then((res) => {
      if (res.status === 400) {
        let output_text = '';
        output_text += '[UPBIT API]\n';
        output_text += '<' + upbit_coin_symbol + '/KRW>\n';
        output_text +=
          numberWithCommas('현재가 ' + upbit_json[0].trade_price) +
          ' (' +
          (upbit_json[0].signed_change_rate * 100).toFixed(2) +
          '%)\n\n';
        output_text += '24H 고가 : (' + maxPercent + '%)' + numberWithCommas(upbit_json[0].high_price) + ' KRW\n';
        output_text += '24H 저가 : (' + minPercent + '%)' + numberWithCommas(upbit_json[0].low_price) + ' KRW\n';
        output_text += '24H 종가 : ' + numberWithCommas(upbit_json[0].prev_closing_price) + ' KRW\n';
        output_text +=
          '24H 거래량 : ' + numberWithCommas(upbit_json[0].acc_trade_volume_24h.toFixed(2)) + ' ' + upbit_coin_symbol;
        replier.reply(output_text);
      }
    });
  }
}
/* 업비트 JSON 함수 */

function upbit_func(coin_symbol) {
  let upbit_url = 'https://api.upbit.com/v1/ticker?markets=KRW-';
  upbit_url += coin_symbol;
  return JSON.parse(org.jsoup.Jsoup.connect(upbit_url).ignoreContentType(true).get().text());
}
/* 화폐단위 컴마출력 */

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function sendKakao(room, template_args) {
  return Kakao.sendLink(
    room,
    {
      template_id: 77428,
      template_args: template_args,
    },
    'custom',
    true
  );
}
