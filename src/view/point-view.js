import AbstractView from '../framework/view/abstract-view.js';
import { formatStringToDayTime, formatStringToTime, getPointDuration, formatStringToShortDate } from '../utils/day.js';
import he from 'he';

const createPointTemplate = ({ point, pointDestinations, pointOffers }) => {
  const { basePrice, dateFrom, dateTo, type, isFavorite } = point;
  const { name } = pointDestinations;
  const selectedOffers = pointOffers.filter((offer) => point.offers.includes(offer.id));
  return `
        <li class="trip-events__item">
            <div class="event">
            <time class="event__date" datetime=${formatStringToDayTime(dateFrom)}>
              ${formatStringToShortDate(dateFrom)}
            </time>
            <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${he.encode(String(type))} ${he.encode(String(name))}</h3>
            <div class="event__schedule">
                <p class="event__time">
                <time class="event__start-time" datetime=${formatStringToDayTime(dateFrom)}>${formatStringToTime(dateFrom)}</time>
                &mdash;
                <time class="event__end-time" datetime=${formatStringToDayTime(dateTo)}>${formatStringToTime(dateTo)}
                </p>
                <p class="event__duration">${getPointDuration(dateFrom, dateTo)}</p>
            </div>
            <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">
                ${he.encode(String(basePrice))}
                </span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${selectedOffers.map((offer) => `
                <li class="event__offer">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>`).join('')}
            </ul>
            <button class="event__favorite-btn  ${(isFavorite) ? 'event__favorite-btn--active' : ''}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
            </button>
            <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
            </button>
            </div>
        </li>
    `;
};

export default class PointView extends AbstractView {
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, pointDestinations, pointOffers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers
    }
    );
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
