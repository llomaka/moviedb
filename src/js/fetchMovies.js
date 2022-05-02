import axios from "axios";

axios.defaults.baseURL = 'https://developers.themoviedb.org/3/trending/get-trending';
const AUTH_TOKEN = '?api_key=fdf0e898687a376156944fbb1ab25196';
const PARAMS = '&language=en-US&include_image_language=en,null&media_type=movie&include_adult=true&per_page=40&page=';

export async function fetchPictures(input, pageCounter = 1) {
  const data = await axios(AUTH_TOKEN + input + PARAMS + pageCounter);
  return data;
}