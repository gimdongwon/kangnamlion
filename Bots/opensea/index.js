const useKakaoLink = Bridge.getScopeOf('kakaolink').useKakaoLink;

function main(replier, room, target) {
  try {
    const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));

    if (Object.keys(dict_data).indexOf(target) > -1) {
      target = dict_data[target];
    }
    const data = opensea_func(target);
    const imgUrl = data.collection.banner_image_url;
    const floorPrice = data.collection.stats['floor_price'];
    const averagePrice = data.collection.stats['average_price'];
    const oneDayVolume = data.collection.stats['one_day_volume'].toFixed(2);
    const totalVolume = data.collection.stats['total_volume'].toFixed(2);
    const ethJson = getETHprice();
    const krwPrice = numberWithCommas(ethJson[0].trade_price * floorPrice).split('.')[0];
    const klay = callCoinInfo();
    const klayPrice = klay.data['closing_price'];
    const klayFloorPrice = numberWithCommas((ethJson[0].trade_price * floorPrice) / klayPrice).split('.')[0];
    const klayAveragePrice = numberWithCommas((ethJson[0].trade_price * averagePrice) / klayPrice).split('.')[0];

    const template_args = {
      template_id: 79059,
      template_args: {
        title: target,
        imgUrl: imgUrl,
        floorPrice: floorPrice.toFixed(2),
        averagePrice: averagePrice.toFixed(2),
        oneDayVolume: oneDayVolume,
        totalVolume: totalVolume,
        krwPrice: krwPrice,
        klayFloorPrice: klayFloorPrice,
      },
    };

    let result = '';
    result += target + '\n\n';
    result += '전체거래량😇 : ' + totalVolume + ' ETH\n';
    result += '하루거래량⚡️ : ' + oneDayVolume + ' ETH\n';
    result += '평균가 😁 : ' + averagePrice.toFixed(2) + ' ETH  ' + klayAveragePrice + ' KLAY \n';
    result += '바닥가 😱 : E: ' + floorPrice.toFixed(2) + '   K: ' + klayFloorPrice + '\n\n';
    result += '💰바닥가 : ' + krwPrice + '원';

    useKakaoLink(room, replier, template_args, result);
  } catch (error) {}
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
