import { getRandomPositiveInteger, getRandomArrayElement } from '../utils/common.js';

import { generateMockDestination } from '../mock/destination.js';
import { generateMockOffer } from '../mock/offer.js';
import { generateMockPoint } from '../mock/point.js';

import {
  TYPES,
  DESTINATION_COUNT,
  OFFER_COUNT,
  POINT_COUNT,
} from '../const.js';

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = this.generateMockDestinations();
    this.#offers = this.generateMockOffers();
    this.#points = this.generateMockPoints();
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  getPoints() {
    return this.#points;
  }

  generateMockDestinations() {
    return Array.from({ length: DESTINATION_COUNT }, () =>
      generateMockDestination()
    );
  }

  generateMockOffers() {
    return TYPES.map((type) => ({
      type,
      offers: Array.from(
        { length: getRandomPositiveInteger(0, OFFER_COUNT) },
        () => generateMockOffer(type)
      ),
    }));
  }

  generateMockPoints() {
    return Array.from({ length: POINT_COUNT }, () => {
      const type = getRandomArrayElement(TYPES);
      const destination = getRandomArrayElement(this.#destinations);

      const hasOffers = getRandomPositiveInteger(0, 1);
      const offersByType = this.#offers.find(
        (offerByType) => offerByType.type === type
      );

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomPositiveInteger(0, OFFER_COUNT))
          .map((offer) => offer.id)
        : [];

      return generateMockPoint(type, destination.id, offerIds);
    });
  }
}
let pointsData = [];

updatePoint(updatedData) {
  const index = pointsData.findIndex((point) => point.id === updatedData.id);

  if (index !== -1) {
    pointsData[index] = updatedData;
    return true; // Успешное обновление
  }

  return false; // Не найдена такая точка для обновления
}

addPoint(data) {
  const newId = crypto.randomUUID();

  const newElement = { ...data, id: newId };

  pointsData.push(newElement);

  return newElement;
}

deleteById(idToDelete){
  const indexToDelete = pointsData.findIndex(item => item.id === idToDelete)

  if (indexToDelete !== -1) {
    pointsData.splice(indexToDelete, 1)
    return true;//Успешное удаление

  }

  return false;//Не найдена такая запись для удаления

}
