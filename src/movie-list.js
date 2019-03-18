import Movie from './movie';

export default class MovieList {
  constructor(data, element) {
    this._element = element;
    this._moviesData = data;
    this._movies = [];
  }

  get element() {
    return this._element;
  }

  render() {
    const fragment = document.createDocumentFragment();

    this._moviesData.forEach((data) => {
      const movie = new Movie(data);
      this._movies.push(movie);

      fragment.appendChild(movie.render());
    });

    this._element.appendChild(fragment);
  }

  update(newData) {
    this._moviesData = newData;

    if (this._movies) {
      this._movies = [];

      while (this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }

      this.render();
    } else {
      this.render();
    }
  }
}
