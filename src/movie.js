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
      isFavorite: data.state.isFavorite,
      isWatched: data.state.isWatched,
      forWatching: data.state.forWatching,
    };
    this._comments = [];
  }

  get template() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this.releaseYear}</span>
        <span class="film-card__duration">${this.duration}</span>
        <span class="film-card__genre">${this.genre}</span>
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

  set onClick(handler) {
    this._onClickHandler = handler.bind(this);
  }

  get releaseYear() {
    return new Date(this._releaseDate).getFullYear();
  }

  get duration() {
    return `${new Date(this._duration).getHours()}h ${new Date(this._duration).getMinutes()}m`;
  }

  get genre() {
    return [...this._genre].join(`, `);
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onClickHandler);
  }

  render() {
    this._element = utils.createElement(this.template);
    this.bind();
    return this._element;
  }
}
