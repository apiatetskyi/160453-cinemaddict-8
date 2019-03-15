import utils from './utils';

const MIN_RATING = 1;
const MAX_RATING = 10;
const MIN_GENRES = 1;
const MAX_GENRES = 3;

/**
 * Returns string with markup for one movie
 * @param {Object} data
 * @return {string}
 */
const getMarkup = (data) => {
  return `
    <article class="film-card">
      <h3 class="film-card__title">${data.title}</h3>
      <p class="film-card__rating">${data.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${new Date(data.releaseDate).getFullYear()}</span>
        <span class="film-card__duration">
          ${new Date(data.duration).getHours()}h ${new Date(data.duration).getMinutes()}m
        </span>
        <span class="film-card__genre">${[...data.genre].join(`, `)}</span>
      </p>
      <img src="${data.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${data.description}</p>
      <button class="film-card__comments">${data.comments} comments</button>
  
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"
                ${data.state.forWatching ? `disabled` : ``}
        ><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"
                ${data.state.isWatched ? `disabled` : ``}
        ><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"
                ${data.state.isFavorite ? `disabled` : ``}
        ><!--Mark as favorite-->FAV</button>
      </form>
    </article>`;
};


/**
 * Returns fragment with list of movie nodes
 * @param {number} count
 * @return {Node}
 */
const getList = (count) => {
  const emptyArray = new Array(count).fill(``);
  const moviesHtml = emptyArray.reduce((markup) => {
    return markup + getMarkup(getData());
  }, ``);

  return utils.getNode(moviesHtml);
};

const getData = () => {
  const posters = [
    `images/posters/accused.jpg`,
    `images/posters/blackmail.jpg`,
    `images/posters/blue-blazes.jpg`,
    `images/posters/fuga-da-new-york.jpg`,
    `images/posters/moonrise.jpg`,
    `images/posters/three-friends.jpg`,
  ];
  const titles = [
    `Mandy`, `Annihilation`, `Love After Love`,
    `The Rider`, `Cold War`, `First Reformed`,
    `Zama`, `Eighth Grade`, `Thunder Road`,
    `A Private War`, `Shoplifters`, `24 Frames`,
    `Filmworker`, `Paddington 2`, `The Endless`
  ];
  const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const genres = [`comedy`, `action`, `drame`, `thriller`, `crime`, `adventure`, `fantasy`];

  return {
    poster: posters[utils.getRandom(0, posters.length)],
    title: titles[utils.getRandom(0, titles.length)],
    description: utils.shuffleArray(descriptions.split(`. `)).slice(0, utils.getRandom(1, 3)),
    genre: new Set(utils.shuffleArray(genres).slice(0, utils.getRandom(MIN_GENRES, MAX_GENRES))),
    duration: utils.getRandom(new Date(0, 0, 0, 1, 30).getTime(), new Date(0, 0, 0, 3).getTime()),
    releaseDate: utils.getRandom(new Date(2009, 1, 1).getTime(), new Date().getTime()),
    rating: utils.getRandom(MIN_RATING, MAX_RATING),
    state: {
      isFavorite: Math.random() >= 0.5,
      isWatched: Math.random() >= 0.5,
      forWatching: Math.random() >= 0.5,
    },
    comments: utils.getRandom(0, 20)
  };
};

export default {getMarkup, getList, getData};
