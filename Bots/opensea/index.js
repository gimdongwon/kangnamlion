const {KakaoLinkClient} = require('kakaolink');

const {KAKAO_CLIENT_KEY, KAKAO_ID, KAKAO_PASSWORD} = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const Kakao = new KakaoLinkClient(KAKAO_CLIENT_KEY, 'https://developers.kakao.com');
Kakao.login(KAKAO_ID, KAKAO_PASSWORD);

function opensea(symbol) {
  const url = `https://api.opensea.io/api/v1/collection/${symbol}`;
  return JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
}

function eth() {
  return JSON.parse(
    org.jsoup.Jsoup.connect('https://api.upbit.com/v1/ticker?markets=KRW-ETH').ignoreContentType(true).get().text(),
  );
}

function comma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function klay() {
  return JSON.parse(
    org.jsoup.Jsoup.connect('https://api.bithumb.com/public/ticker/KLAY_KRW').ignoreContentType(true).get().text(),
  );
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (!msg.startsWith('옾')) {
    return;
  }

  try {
    const dict = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
    const temp = msg.split(' ');
    const title = dict[temp[1]] || temp[1];

    const result = opensea(title).collection;
    const imgUrl = result.banner_image_url;
    const floorPrice = result.stats.floor_price && result.stats.floor_price.toFixed(2);
    const averagePrice = result.stats.average_price && result.stats.average_price.toFixed(2);
    const oneDayVolume = result.stats.one_day_volume.toFixed(2);
    const totalVolume = result.stats.total_volume.toFixed(2);

    const ethJson = eth();
    const krwPrice = comma(ethJson[0].trade_price * floorPrice).split('.')[0];

    const klayPrice = klay().data.closing_price;
    const klayFloorPrice = comma((ethJson[0].trade_price * floorPrice) / klayPrice).split('.')[0];
    Kakao.sendLink(
      room,
      {
        template_id: 79059,
        template_args: {
          title,
          imgUrl,
          floorPrice,
          averagePrice,
          oneDayVolume,
          totalVolume,
          krwPrice,
          klayFloorPrice,
        },
      },
      'custom',
    );
  } catch (e) {
    replier.reply(e);
  }
}
