import Component from './component';

export default class Filter extends Component {
  constructor(data) {
    super();
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

  bind() {
    this._element.addEventListener(`click`, this._onClickHandler);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onClickHandler);
  }
}
