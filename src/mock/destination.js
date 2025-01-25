import { getRandomArrayElement } from '../utils.js';
import { CITIES, DESCRIPTIONS } from '../const.js';

function generateMockDestination(destinationId) {
  const city = getRandomArrayElement(CITIES);
  const description = getRandomArrayElement(DESCRIPTIONS); // Исправлено
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
