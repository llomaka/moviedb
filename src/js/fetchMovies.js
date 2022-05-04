import axios from "axios";

// axios.defaults.baseURL = 'https://developers.themoviedb.org/3/trending/get-trending';
// const AUTH_TOKEN = '?api_key=fdf0e898687a376156944fbb1ab25196';
// const PARAMS = '&language=en-US&include_image_language=en,null&media_type=movie&include_adult=true&per_page=40&page=';

export async function fetchMovies(input, pageCounter = 1) {
  const { data } = await axios(`https://api.themoviedb.org/3/search/movie?api_key=fdf0e898687a376156944fbb1ab25196&language=en-US&page=${pageCounter}&include_adult=false&query=${input}`);
  return data;
}