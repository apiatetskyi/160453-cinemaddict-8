import utils from "./utils";
import Filter from './filter';

export default class FilterList {
  constructor(data, element, bound) {
    this._element = element;
    this._filters = [];
    this._bound = bound;
    this._filtersData = data;
  }

  render() {
    const fragment = document.createDocumentFragment();

    this._filtersData.forEach((data) => {
      const filter = new Filter(data);

      filter.onClick = () => {
        const emptyArray = new Array(utils.getRandom(4, 10)).fill(``);
        this._bound.update(emptyArray.map(() => utils.generateData()));
      };

      fragment.appendChild(filter.render());

      this._filters.push(filter);
    });

    this._element.appendChild(fragment);
  }
}
