import './css/main.css';
import { Notify } from 'notiflix';
import { fetchMovies } from './js/fetchMovies';
import { fetchTrending } from './js/fetchTrending';
import { renderMovie } from './js/renderMovie';
import { renderTrending } from './js/renderMovieCard';
import { renderMovieCard } from './js/renderMovieCard';
import { getGenres } from './js/getGenres';
import getRefs from './js/getRefs';
import { addBackToTop } from 'vanilla-back-to-top'
import axios from "axios";

const STORAGE_KEY = 'movie-page-number';
const STORAGE_SEARCH = 'movie-search-end';
const refs = getRefs();
let searchValue = '';
Notify.init({ fontSize: '18px', timeout: 7000});
refs.more.classList.add("visually-hidden");
refs.button.addEventListener('click', onSubmit);
refs.more.addEventListener('click', onClick);
addBackToTop();

async function fetchGenres() {
  const { data } = await axios('https://api.themoviedb.org/3/genre/movie/list?api_key=fdf0e898687a376156944fbb1ab25196&language=en-US');
  return data.genres;
}

fetchGenres().then(response => localStorage.setItem("genres", JSON.stringify(response)));
const genres = JSON.parse(localStorage.getItem("genres"));
fetchTrending().then(response => renderTrending(refs.gallery, response.results, genres)).catch(onSearchError);

function onSubmit(event) {
  event.preventDefault();
  refs.more.classList.add("visually-hidden");
  const value = refs.input.value.trim();
  searchValue = value;
  refs.gallery.innerHTML = '';
  localStorage.removeItem(STORAGE_SEARCH);
  localStorage.removeItem(STORAGE_KEY);
  if (!value) {
    return Notify.warning('Please enter some text to input field!');
  }
  fetchMovies(value)
    .then(response => {
      // refs.gallery.innerHTML = '';
      console.log(response.results[0]);
      renderMovie(refs.gallery, response.results[0], genres);
      // if (response.data.totalHits === 0)
      //   return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      // Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      // renderGallery(response);
      // if (response.data.totalHits < 40) {
      //   Notify.warning("We're sorry, but you've reached the end of search results.");
      //   localStorage.setItem(STORAGE_SEARCH, 1);
      // }
      // if (response.data.totalHits > 40) {
      //   refs.more.classList.remove("visually-hidden");
      // }
    })
    .catch(onSearchError);
  event.target.form.reset();
};

function onClick() {
  if (localStorage.getItem(STORAGE_SEARCH))
    return Notify.warning("We're sorry, but you've reached the end of search results.");
  let pageCounter = 1;
  if (localStorage.getItem(STORAGE_KEY))
    pageCounter = localStorage.getItem(STORAGE_KEY);
  fetchMovies(searchValue, Number(pageCounter) + 1)
    .then(response => {
      renderMovie(refs.gallery, response, genres);
    })
    .catch(onSearchError);
}

function onSearchError(error) {
  Notify.failure(error);
  console.error(error);
}


// let genre_id = [36, 53, 10752];
// const parsed = getGenres(genre_id, genres);
// console.log(parsed);
