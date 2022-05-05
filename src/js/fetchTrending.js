import axios from "axios";

export async function fetchTrending() {
  const { data } = await axios(`https://api.themoviedb.org/3/search/movie?api_key=fdf0e898687a376156944fbb1ab25196&language=en-US&page=${pageCounter}&include_adult=false&query=${input}`);
  return data;
}