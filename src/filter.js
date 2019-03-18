import utils from './utils';

export default class Filter {
  constructor(data) {
    this._element = null;
    this._id = data.id ? data.id : data.title.toLowerCase().replace(` `, `-`);
    this._title = data.title;
    this._count = data.count;
    this._state = {
      isActive: data.isActive,
      isAdditional: data.isAdditional,
    };
  }

  get template() {
    return `
    <a href="#${this._id}"
       class="main-navigation__item ${this._state.isActive ? this._state.isActive : ``}
              ${this._state.isAdditional ? `main-navigation__item--additional` : ``}"
    >
      ${this._title}
      ${this._count ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
    </a>`;
  }

  set onClick(handler) {
    this._onClickHandler = handler.bind(this);
  }

  _bind() {
    this._element.addEventListener(`click`, this._onClickHandler);
  }

  render() {
    this._element = utils.createElement(this.template);
    this._bind();
    return this._element;
  }
}
