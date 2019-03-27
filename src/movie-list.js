import Movie from './movie';
import MoviePopup from './movie-popup';

export default class MovieList {
  constructor(data, element) {
    this._element = element;
    this._moviesData = data;
    this._movies = [];
  }

  render() {
    const fragment = document.createDocumentFragment();

    this._moviesData.forEach((data) => {
      const movie = new Movie(data);
      const popup = new MoviePopup(data);

      this._movies.push(movie);

      movie.onClick = () => {
        popup.onClose = (newData) => {
          movie.bind();
          movie.update(newData);
          popup.unRender();
        };

        popup.onCommentAdd = (comment) => {
          movie._comments.push(comment);
          movie._element.querySelector(`.film-card__comments`).textContent = `${movie._comments.length} comments`;
        };

        document.body.appendChild(popup.render());
      };

      fragment.appendChild(movie.render());
    });

    this._element.appendChild(fragment);
  }

  update(newData) {
    this._moviesData = newData;

    if (this._movies) {
      this._movies.forEach((movie) => movie.unRender());
      this._movies = [];
      this.render();
    } else {
      this.render();
    }
  }
}
