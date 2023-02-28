function main(replier) {
  const data = getTokensPrice();

  let result = '';
  result += '👟SuperWalk 대시보드\n\n';
  result += 'KLAY 클레이튼\n' + data['KLAY'].toFixed(2) + ' 원\n\n';
  result += 'WALK 워크\n' + data['WALK'].toFixed(2) + ' 원\n\n';
  result += 'GRND 그라운드\n' + data['GRND'].toFixed(2) + ' 원\n\n';
  result += 'by 강남사자';
  replier.reply(result);
}

const getTokensPrice = () => {
  const url =
    'https://api.swapscanner.io/api/tokens/prices?tokenAddressList=0x84f8c3c8d6ee30a559d73ec570d574f671e82647,0x976232eb7eb92287ff06c5d145bd0d1c033eca58,0x0000000000000000000000000000000000000000,0x8888888888885b073f3c81258c27e83db228d5f3';
  const data = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
  const usdt = getDollar();
  const result = {
    GRND: data['0x84f8c3c8d6ee30a559d73ec570d574f671e82647'] * usdt,
    WALK: data['0x976232eb7eb92287ff06c5d145bd0d1c033eca58'] * usdt,
    KLAY: data['0x0000000000000000000000000000000000000000'] * usdt,
    USDT: getDollar(),
  };
  return result;
};

const getDollar = () => {
  const url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
  const data = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).get().text());
  return data[0].basePrice;
};

exports.ApiService = main;
