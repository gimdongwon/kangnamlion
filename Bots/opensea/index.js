const env = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient(env['KAKAO_CLIENT_KEY'], 'https://developers.kakao.com');
Kakao.login(env['KAKAO_ID'], env['KAKAO_PASSWORD']); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (msg.startsWith('옾')) {
    try {
      const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
      const temp = msg.split(' ');
      let target = temp[1];
      if (Object.keys(dict_data).indexOf(target) > -1) {
        target = dict_data[target];
      }
      const result = opensea_func(target);
      const imgUrl = result.collection.banner_image_url;
      const floorPrice = result.collection.stats['floor_price'] && result.collection.stats['floor_price'].toFixed(2);
      const averagePrice =
        result.collection.stats['average_price'] && result.collection.stats['average_price'].toFixed(2);
      const oneDayVolume = result.collection.stats['one_day_volume'].toFixed(2);
      const totalVolume = result.collection.stats['total_volume'].toFixed(2);
      const ethJson = getETHprice();
      const krwPrice = numberWithCommas(ethJson[0].trade_price * floorPrice).split('.')[0];
      const klay = callCoinInfo();
      const klayPrice = klay.data['closing_price'];
      const klayFloorPrice = numberWithCommas((ethJson[0].trade_price * floorPrice) / klayPrice).split('.')[0];
      Kakao.sendLink(
        room,
        {
          template_id: 79059,
          template_args: {
            title: target,
            imgUrl: imgUrl,
            floorPrice: floorPrice,
            averagePrice: averagePrice,
            oneDayVolume: oneDayVolume,
            totalVolume: totalVolume,
            krwPrice: krwPrice,
            klayFloorPrice: klayFloorPrice,
          },
        },
        'custom'
      );
      // replier.reply(output_text);
    } catch (error) {}
  }
}

function opensea_func(opensea_symbol) {
  let opensea_url = 'https://api.opensea.io/api/v1/collection/' + opensea_symbol;
  return JSON.parse(org.jsoup.Jsoup.connect(opensea_url).ignoreContentType(true).get().text());
}

function getETHprice() {
  return JSON.parse(
    org.jsoup.Jsoup.connect('https://api.upbit.com/v1/ticker?markets=KRW-ETH').ignoreContentType(true).get().text()
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function callCoinInfo() {
  return JSON.parse(
    org.jsoup.Jsoup.connect('https://api.bithumb.com/public/ticker/KLAY_KRW').ignoreContentType(true).get().text()
  );
}
