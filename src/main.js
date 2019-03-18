import utils from './utils';
import FilterList from './filter-list';
import MovieList from './movie-list';

const MOVIE_CARDS_COUNT = 2;

const filterData = [
  {
    id: `all`,
    title: `All movies`,
    isActive: true,
  },
  {
    title: `Watchlist`,
    count: 13,
  },

  {
    title: `History`,
    count: 4,
  },

  {
    title: `Favorites`,
    count: 5,
  },

  {
    title: `Stats`,
    isAdditional: true,
  },
];
const movieContainers = document.querySelectorAll(`.films-list__container`);
const emptyArray = new Array(MOVIE_CARDS_COUNT).fill(``);

movieContainers.forEach((container) => {
  if (!container.parentNode.classList.contains(`films-list--extra`)) {
    const allMovies = new MovieList(emptyArray.map(() => utils.generateData()), container);
    allMovies.render();
    new FilterList(filterData, document.querySelector(`.main-navigation`), allMovies).render();
  } else {
    new MovieList(emptyArray.map(() => utils.generateData()), container).render();
  }
});
