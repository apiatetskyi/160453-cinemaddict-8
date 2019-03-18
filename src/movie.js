import utils from "./utils";

export default class Movie {
  constructor(data) {
    this._element = null;
    this._poster = data.poster;
    this._title = data.title;
    this._description = data.description;
    this._genre = data.genre;
    this._duration = data.duration;
    this._releaseDate = data.releaseDate;
    this._rating = data.rating;
    this._state = {
      isFavorite: data.isFavorite,
      isWatched: data.isWatched,
      forWatching: data.forWatching,
    };
    this._comments = [];
  }

  get template() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${new Date(this._releaseDate).getFullYear()}</span>
        <span class="film-card__duration">
          ${new Date(this._duration).getHours()}h ${new Date(this._duration).getMinutes()}m
        </span>
        <span class="film-card__genre">${[...this._genre].join(`, `)}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments.length} comments</button>
  
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"
                ${this._state.forWatching ? `disabled` : ``}
        ><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"
                ${this._state.isWatched ? `disabled` : ``}
        ><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"
                ${this._state.isFavorite ? `disabled` : ``}
        ><!--Mark as favorite-->FAV</button>
      </form>
    </article>`;
  }

  render() {
    this._element = utils.createElement(this.template);
    return this._element;
  }
}
