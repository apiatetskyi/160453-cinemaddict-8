const MIN_RATING = 1;
const MAX_RATING = 10;
const MIN_GENRES = 1;
const MAX_GENRES = 3;

/**
 * Returns random number from range
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Returns fragment with nodes, created from valid HTML string
 * @param {string} htmlString
 * @return {Node}
 */
const createElement = (htmlString) => {
  const parser = new DOMParser();
  const parentNode = document.createElement(`div`);
  const html = parser.parseFromString(htmlString, `text/html`);
  const fragment = document.createDocumentFragment();

  html.body.childNodes.forEach((node) => {
    fragment.appendChild(node);
  });

  parentNode.appendChild(fragment);

  return parentNode.firstChild;
};

const generateData = () => {
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
    poster: posters[getRandom(0, posters.length)],
    title: titles[getRandom(0, titles.length)],
    description: shuffleArray(descriptions.split(`. `)).slice(0, getRandom(1, 3)),
    genre: new Set(shuffleArray(genres).slice(0, getRandom(MIN_GENRES, MAX_GENRES))),
    duration: getRandom(new Date(0, 0, 0, 1, 30).getTime(), new Date(0, 0, 0, 3).getTime()),
    releaseDate: getRandom(new Date(2009, 1, 1).getTime(), new Date().getTime()),
    rating: getRandom(MIN_RATING, MAX_RATING),
    state: {
      isFavorite: Math.random() >= 0.5,
      isWatched: Math.random() >= 0.5,
      forWatching: Math.random() >= 0.5,
    },
    comments: getRandom(0, 20)
  };
};

/**
 * Randomly shuffle an array
 * @param  {Array} array
 * @return {Array}
 */
const shuffleArray = function (array) {

  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export default {createElement, generateData, getRandom, shuffleArray};
