function main(replier) {
  try {
    const domi = JSON.parse(
      org.jsoup.Jsoup.connect('https://api.coingecko.com/api/v3/global').ignoreContentType(true).get().text()
    ).data;

    // market_cap_percentage 데이터 접근
    const btc = domi.market_cap_percentage.btc.toFixed(2) || 0;
    const eth = domi.market_cap_percentage.eth.toFixed(2) || 0;
    const xrp = domi.market_cap_percentage.xrp.toFixed(2) || 0;
    const sol = domi.market_cap_percentage.sol.toFixed(2) || 0;

    // 결과 메시지 작성
    let result = '🌎 코인 도미넌스 (Market Dominance)\n\n';
    result += '🟡 【비트코인】 BTC : ' + btc + '% 🔥\n';
    result += '🟦 【이더리움】 ETH : ' + eth + '% 🚀\n';
    result += '🔵 【리플】 XRP : ' + xrp + '% 💎\n';
    result += '🟣 【솔라나】 SOL : ' + sol + '% 🌞';

    replier.reply(result);
  } catch (error) {
    replier.reply('❌ 에러 발생: ' + error.message);
  }
}

exports.ApiService = main;
