import utils from './utils';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  bind() {}

  unbind() {}

  update() {}

  render() {
    this._element = utils.createElement(this.template);
    this.bind();
    return this._element;
  }

  unRender() {
    this._element.parentNode.removeChild(this._element);
    this.unbind();
    this._element = null;
  }
}
