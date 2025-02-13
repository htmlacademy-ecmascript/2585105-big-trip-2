import SortView from '../view/sort-view.js';
import EditList from '../view/event-list-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';
import EmptyListView from '../view/list-empty.js';
import { SortType, FilterType } from '../const.js';
import { sortPointByTime, sortPointByPrice, sortPointByDay } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

export default class BoardPresenter {
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #editListComponent = new EditList();
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #pointPresenters = new Map();

  constructor({ container, destinationsModel, offersModel, pointsModel, filterModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.get();
    const filteredPoints = filter[filterType](this.#pointsModel.get());
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case SortType.DAY:
        return filteredPoints.sort(sortPointByDay);
    }
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#editListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointsChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container);
  };

  #handleModelEvent = (updateType, date) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.pointsPresenters?.get
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#clearPoints();
    this.#renderPoints();
  };

  #renderPointContainer = () => {
    render(this.#editListComponent, this.#container);
  };

  #renderEmpty = () => {
    if (this.points.length === 0) {
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

