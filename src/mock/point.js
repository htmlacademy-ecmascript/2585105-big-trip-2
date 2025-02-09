import { getRandomPositiveInteger } from '../utils/common.js';
import { price } from '../const.js';
import { getDate } from './utils.js';

function generateMockPoint(type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomPositiveInteger(price.MIN, price.MAX),
    dateFrom: getDate({ next: false }),
    dateTo: getDate({ next: true }),
    destination: destinationId,
    isFavorite: !!getRandomPositiveInteger(0, 1),
    offers: offerIds,
    type,
  };
}

export { generateMockPoint };
