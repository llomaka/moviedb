import { getGenres } from "./getGenres";

export function renderMovieCard(film, genres) {
  let genre = '';
  if (film.genre_ids.length === 0) {
    genre = 'Not Available';
  } else if (film.genre_ids.length > 3) {
    genre = getGenres(film.genre_ids.slice(0,2), genres) + ', Other';
  } else {
    genre = getGenres(film.genre_ids, genres);
  }
  if (!film.title) {
    if (film.original_title) {
      film.title = film.original_title;
    } else if (film.name) {
      film.title = film.name;
    } else if (film.original_name) {
      film.title = film.original_name;
    } else {
      film.title = 'Not Available';
    }
  }
  if (!film.release_date) {
    film.release_date = '';
  }
  if (!film.poster_path) {
    film.poster_path = "/rTjDoLo2eTggYVGNPKjfAX9SqT5.jpg";
  }
  return `<li class="movie__item">
    <img class="movie__poster"
      src="https://image.tmdb.org/t/p/w342${film.poster_path}"
      alt="${film.title} Poster"
    />
    <div class="movie__caption">
      <h2 class="movie__title">${film.title}</h2>
      <p class="movie__genre">${genre} | ${film.release_date.slice(0, 4)} <span class="movie__vote">${film.vote_average.toFixed(1)}<span></p>
    </div>
  </li>`;
}

export function renderTrending(container, films_array, genres) {
  const markup = films_array.map(element => renderMovieCard(element, genres)).join('');
  container.innerHTML = `<ul class="movie__list">${markup}</ul>`;
}