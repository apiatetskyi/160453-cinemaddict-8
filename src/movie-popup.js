import moment from 'moment';
import Component from './component';
import Comment from './comment';

const MAX_RATING = 9;
const ENTER_KEY_CODE = 13;

export default class MoviePopup extends Component {
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

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onUserRatingChange = this._onUserRatingChange.bind(this);
    this._onCommentSubmit = this._onCommentSubmit.bind(this);
    this._onClose = null;
  }

  static createMapper(target) {
    return {
      'watchlist': () => {
        target.state.forWatching = true;
      },
      'watched': () => {
        target.state.isWatched = true;
      },
      'favorite': () => {
        target.state.isFavorite = true;
      },
      'score': (value) => {
        target.userRating = parseInt(value, 10);
      },
      'comment': (value) => {
        target.commentData.message = value;
      },
      'comment-emoji': (value) => {
        target.commentData.emoji = value;
      }
    };
  }

  static processForm(formData) {
    const entry = {
      state: {
        isFavorite: false,
        isWatched: false,
        forWatching: false,
      },
      userRating: null,
      commentData: {
        author: `Visitor`,
        message: null,
        emoji: null,
        date: new Date().getTime(),
      },
      comment: null,
    };

    const taskEditMapper = MoviePopup.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    if (entry.commentData.message) {
      entry.comment = new Comment(entry.commentData);
    }

    return entry;
  }

  get template() {
    return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._poster}" alt="${this.posterAlt}">
    
            <p class="film-details__age">18+</p>
          </div>
    
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: Невероятная семейка</p>
              </div>
    
              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">Your rate ${this._userRating || ``}</p>
              </div>
            </div>
    
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Brad Bird</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Brad Bird</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._releaseDate).format(`D MMMM YYYY`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this.duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${this.genresMarkup}
                </td>
              </tr>
            </table>
    
            <p class="film-details__film-description">${this._description}</p>
          </div>
        </div>
    
        <section class="film-details__controls">
          <input type="checkbox"
                 class="film-details__control-input visually-hidden"
                 id="watchlist"
                 name="watchlist"
                 ${this._state.forWatching && `checked`}
          >
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
          <input type="checkbox"
                 class="film-details__control-input visually-hidden"
                 id="watched"
                 name="watched"
                 ${this._state.isWatched && `checked`}
          >
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
          <input type="checkbox"
                 class="film-details__control-input visually-hidden"
                 id="favorite"
                 name="favorite"
                 ${this._state.isFavorite && `checked`}
          >
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
    
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
    
          <ul class="film-details__comments-list">
            ${this.commentsMarkup}
          </ul>
    
          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
              </div>
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment" required></textarea>
            </label>
          </div>
        </section>
    
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
          </div>
    
          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>
    
            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">Incredibles 2</h3>
    
              <p class="film-details__user-rating-feelings">How you feel it?</p>
    
              <div class="film-details__user-rating-score">
                ${this.ratingMarkup}
              </div>
            </section>
          </div>
        </section>
      </form>
    </section>`;
  }

  set onClose(handler) {
    this._onClose = handler;
  }

  set onCommentAdd(handler) {
    this._onCommentAdd = handler;
  }

  get duration() {
    return moment.duration({
      minutes: moment(this._duration).format(`m`),
      hours: moment(this._duration).format(`h`),
    }).asMinutes() + ` min`;
  }

  get posterAlt() {
    return this._title.toLowerCase().replace(` `, `-`);
  }

  get genresMarkup() {
    return [...this._genre].reduce((markup, genre) => {
      return markup + `<span class="film-details__genre">${genre.charAt(0).toUpperCase() + genre.slice(1)}</span>`;
    }, ``);
  }

  get commentsMarkup() {
    return this._comments.reduce((markup, comment) => {
      comment.render();
      return markup + comment.template;
    }, ``);
  }

  get ratingMarkup() {
    const emptyArray = new Array(MAX_RATING).fill(``);

    return emptyArray.reduce((markup, _, index) => {
      index = index + 1;

      return markup + `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index}" id="rating-${index}" ${index === this._userRating && `checked`}>
      <label class="film-details__user-rating-label" for="rating-${index}">${index}</label>`;
    }, ``);
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onUserRatingChange);
    document.addEventListener(`keydown`, this._onCommentSubmit);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`).removeEventListener(`click`, this._onUserRatingChange);
    document.removeEventListener(`keydown`, this._onCommentSubmit);
  }

  update(data) {
    this._state = data.state;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    const newData = this._collectFormData();
    this.update(newData);

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
  }

  _onCommentSubmit(evt) {
    if (evt.ctrlKey && evt.keyCode === ENTER_KEY_CODE) {
      const comment = this._collectFormData().comment;

      this._comments.push(comment);
      this._element.querySelector(`.film-details__comments-list`).appendChild(comment.render());
      this._element.querySelector(`.film-details__comment-input`).value = ``;
      this._element.querySelector(`.film-details__comments-count`).textContent = this._comments.length.toString();

      if (typeof this._onClose === `function`) {
        this._onCommentAdd(comment);
      }
    }
  }

  _collectFormData() {
    return MoviePopup.processForm(new FormData(this._element.querySelector(`.film-details__inner`)));
  }

  _onUserRatingChange() {
    this._userRating = this._collectFormData().userRating;
    this._element.querySelector(`.film-details__user-rating`).textContent = `Your rate ${this._userRating}`;
  }
}
