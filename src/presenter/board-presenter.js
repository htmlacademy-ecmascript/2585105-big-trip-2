import SortView from '../view/sort-view.js';
import EditList from '../view/event-list-view.js';
import PointPresenter from './point-presenter.js'
import { render, replace } from '../framework/render.js';
import EmptyListView from '../view/list-empty.js';

export default class BoardPresenter {
  #sortComponent = new SortView();
  #editListComponent = new EditList();
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({ container, destinationsModel, offersModel, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = ([...this.#pointsModel.get()]);
  }

  init() {
    this.#renderBoard();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#editListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    pointPresenter.init(point);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #renderPointContainer = () => {
    render(this.#editListComponent, this.#container);
  };

  #renderEmpty = () => {
    if (this.#points.length === 0) {
      render(new EmptyListView(), this.#container);
    }
  };

  #renderBoard = () => {
    this.#renderSort();
    this.#renderEmpty();
    this.#renderPointContainer();
    this.#renderPoints();
  };
}
