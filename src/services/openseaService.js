import axios from 'axios';

const setMarketKoreanName = () => {
  let marketKoreanName = {
    비트: 'KRW-BTC',
    이더: 'KRW-EHE',
  };
};

const getOpenseaInfo = async (target) => {
  const upbitURL = process.env.OPENSEA_TICKER;
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json' },
    url: upbitURL + target,
  };

  const result = await axios
    .request(options)
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
};

export default { getOpenseaInfo };
