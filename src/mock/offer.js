import { getRandomPositiveInteger, getRandomArrayElement } from '../utils.js';
import { OFFERS, Price } from '../const.js';

function generateMockOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomPositiveInteger(Price.MIN, Price.MAX)
  };
}

export { generateMockOffer };
