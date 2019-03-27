import moment from 'moment';
import Component from './component';

export default class Comment extends Component {
  constructor(data) {
    super();
    this._element = null;
    this._author = data.author || `Visitor`;
    this._message = data.message;
    this._emoji = data.emoji;
    this._date = data.date;
  }

  get emoji() {
    const emojies = {
      'sleeping': `😴`,
      'neutral-face': `😐`,
      'grinning': `😀`,
    };

    return emojies[this._emoji];
  }

  get template() {
    return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">${this.emoji}</span>
      <div>
        <p class="film-details__comment-text">${this._message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${this._author}</span>
          <span class="film-details__comment-day">${moment().from(this._date)}</span>
        </p>
      </div>
    </li>`;
  }
}
