import { upbitService } from '../services/index.js';

const getUpbitMarketPrice = async () => {
  let targetPrice = await upbitService.getPriceMarekt('KRW-BTC');
  targetPrice = targetPrice[0];
  console.log(targetPrice);
  console.log('현재가 ', targetPrice.trade_price);
  const percent = (targetPrice.signed_change_rate * 100).toFixed(2);
  console.log(`등락율 ${percent}%`);
  console.log(`최고가 ${targetPrice.high_price} 원`);
  console.log(`최저가 ${targetPrice.low_price} 원`);
  console.log(`거래대금 ${(Math.round(targetPrice.acc_trade_price_24h) / 100000000).toFixed(2)}억원`);
};

export default { getUpbitMarketPrice };
