import { getRandomPositiveInteger, getRandomArrayElement } from '../utils/common.js';
import { OFFERS, price } from '../const.js';

function generateMockOffer() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomPositiveInteger(price.MIN, price.MAX),
  };
}

export { generateMockOffer };
