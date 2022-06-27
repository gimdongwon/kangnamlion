import { openseaService } from '../services/index.js';
import { upbitService } from '../services/index.js';

const getOpenseaInfo = async () => {
  let targetPrice = await upbitService.getPriceMarekt('KRW-ETH');
  const target = await openseaService.getOpenseaInfo('spin-the-worlds-first-paintable-nft');
  const data = target['collection'];
  const payment_token = data.payment_tokens[0].symbol;
  console.log(data.stats);
  console.log('name', data.name);
  console.log('바닥가', data.stats.floor_price, payment_token);
  console.log('평균가', data.stats.average_price, payment_token);
  console.log(targetPrice);
};

export default { getOpenseaInfo };
