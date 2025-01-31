export default class DestinationsModel {
  #service;
  #destinations;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.getDestinations();
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    const foundDestination = this.#destinations.find((destination) => destination.id === id);
    return foundDestination || null;
  }
}
