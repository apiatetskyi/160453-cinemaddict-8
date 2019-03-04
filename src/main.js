import filter from './filter';
import movie from './movie';

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
const filtersContainer = document.querySelector(`.main-navigation`);
const movieContainers = document.querySelectorAll(`.films-list__container`);

filtersContainer.appendChild(filter.getList(filterData));
movieContainers.forEach((container) => {
  container.appendChild(movie.getList(MOVIE_CARDS_COUNT));
});
