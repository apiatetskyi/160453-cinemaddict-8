import utils from './utils';
import moment from 'moment';
import Component from './component';
import Comment from './comment';

export default class Movie extends Component {
  constructor(data) {
    super();
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
    this._comments = data.comments.map((commentData) => new Comment(commentData));
    this._userRating = null;

    this._onCommentsClick = null;
    this._onClickHandler = this._onClickHandler.bind(this);
  }

  get template() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this.releaseYear}</span>
        <span class="film-card__duration">${moment(this._duration).format(`h[h] m[m]`)}</span>
        <span class="film-card__genre">${this.genre}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments.length} comments</button>
  
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`;
  }

  set onClick(handler) {
    this._onCommentsClick = handler;
  }

  get releaseYear() {
    return new Date(this._releaseDate).getFullYear();
  }

  get genre() {
    return [...this._genre].join(`, `);
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onClickHandler);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onClickHandler);
  }

  update(data) {
    const newElement = utils.createElement(this.template);

    this._state = data.state;
    this._userRating = data.userRating;

    if (data.comment) {
      this._comments.push(data.comment);
    }

    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this.bind();
  }

  _onClickHandler() {
    this._onCommentsClick();
    this.unbind();
  }
}
