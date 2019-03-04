import filter from './filter';


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
const filterContainer = document.querySelector(`.main-navigation`);
filterContainer.appendChild(filter.getList(filterData));
