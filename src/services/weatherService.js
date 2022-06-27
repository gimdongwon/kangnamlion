import axios from 'axios';

const getWeather = () => {
  console.log('getWeather');
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json' },
    url: 'https://m.search.naver.com/search.naver?query=%EC%84%9C%EC%9A%B8%20%EB%82%A0%EC%94%A8',
  };
  axios.request(options).then((res) => {
    console.log(res);
  });
};

export default { getWeather };
