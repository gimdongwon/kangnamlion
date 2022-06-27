import { weatherService } from '../services/index.js';

const getWeather = () => {
  weatherService.getWeather();
};

export default { getWeather };
