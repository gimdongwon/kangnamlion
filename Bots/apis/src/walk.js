const GRND = '0x84f8c3c8d6ee30a559d73ec570d574f671e82647',
  WALK = '0x976232eb7eb92287ff06c5d145bd0d1c033eca58',
  KLAY = '0x0000000000000000000000000000000000000000';

const sign = {
  up: '▲',
  down: '▽',
};

function main(replier) {
  const data = newGetTokenPrice();
  const grndObj = data['GRND'],
    walkObj = data['WALK'],
    klayObj = data['KLAY'];

  let result = '';
  result += '📌SuperWalk 대시보드\n\n';
  result +=
    'GRND 그라운드\n ' + grndObj.price + '원 ' + grndObj.ratio + '% ' + sign[selectSign(grndObj.ratio)] + '\n\n';
  result += 'WALK 워크\n ' + walkObj.price + '원 ' + walkObj.ratio + '% ' + sign[selectSign(walkObj.ratio)] + '\n\n';
  result +=
    'KLAY 클레이튼\n ' + klayObj.price + '원 ' + klayObj.ratio + '% ' + sign[selectSign(klayObj.ratio)] + '\n\n' + '';
  result += '스왑스캐너 x 슈퍼워크 x 강남사자🚀';
  replier.reply(result);
}

const getDollar = () => {
  const url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
  const data = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
  return data[0].basePrice;
};

const newGetTokenPrice = () => {
  const tokenArr = [GRND, WALK, KLAY];

  const url = 'https://api.swapscanner.io/api/v2/stats/tokens';
  let data = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
  data = data.filter((item) => tokenArr.includes(item.address));
  const usdt = getDollar();
  const GRNDObj = data.find((item) => item.address === GRND),
    WALKObj = data.find((item) => item.address === WALK),
    KLAYObj = data.find((item) => item.address === KLAY);
  const result = {
    GRND: {
      price: (GRNDObj.prices[1] * usdt).toFixed(1),
      ratio: ((GRNDObj.prices[1] / GRNDObj.prices[0] - 1) * 100).toFixed(2),
    },
    WALK: {
      price: (WALKObj.prices[1] * usdt).toFixed(1),
      ratio: ((WALKObj.prices[1] / WALKObj.prices[0] - 1) * 100).toFixed(2),
    },
    KLAY: {
      price: (KLAYObj.prices[1] * usdt).toFixed(1),
      ratio: ((KLAYObj.prices[1] / KLAYObj.prices[0] - 1) * 100).toFixed(2),
    },
  };
  return result;
};

const selectSign = (target) => (target < 0 ? 'down' : 'up');

exports.ApiService = main;
