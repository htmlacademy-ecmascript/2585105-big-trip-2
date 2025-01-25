import { getRandomArrayElement } from '../utils.js';
import { CITIES, DESCROPTIONS } from '../const.js';

function generateMockDestination() {
  const city = getRandomArrayElement(CITIES);
  const description = getRandomArrayElement(DESCROPTIONS);
  return {
    id: crypto.randomUUID(),
    description: description,
    name: city,
    pictures: {
      src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: `${city} description`,
    },
  };
}

export { generateMockDestination };
