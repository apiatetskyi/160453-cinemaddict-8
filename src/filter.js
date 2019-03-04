import utils from './utils';
import movie from './movie';

const filterClickHandler = () => {
  const mainMovieContainer = document.querySelector(`.films-list .films-list__container`);

  while (mainMovieContainer.firstChild) {
    mainMovieContainer.removeChild(mainMovieContainer.firstChild);
  }

  mainMovieContainer.appendChild(movie.getList(utils.getRandom(4, 10)));
};

/**
 * Returns string with markup for one filter
 * @param {Object} filter
 * @return {string}
 */
const getMarkup = (filter) => {
  const id = filter.id ? filter.id : filter.title.toLowerCase().replace(` `, `-`);

  return `
    <a href="#${id}"
       class="main-navigation__item ${filter.isActive ? filter.isActive : ``}
              ${filter.isAdditional ? `main-navigation__item--additional` : ``}"
    >
      ${filter.title}
      ${filter.count ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}
    </a>`;
};


/**
 * Returns fragment with list of filter nodes
 * @param {Object} filtersData
 * @return {Node}
 */
const getList = (filtersData) => {
  const filtersHtml = filtersData.reduce((markup, data) => {
    return markup + getMarkup(data);
  }, ``);

  return utils.getNode(filtersHtml, (node) => {
    node.addEventListener(`click`, filterClickHandler);
  });
};


export default {getMarkup, getList};
