const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '53b469cba4fb62f1c6db020ffd5d08fe';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
   return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(`${BASE_URL}/trending/movie/day?api_key=${KEY}`);
}

export function fetchSearchFilm(searchQuery) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${searchQuery}&page=1`);
}

export function fetchGetMovieDetails(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}?api_key=${KEY}`);
}

export function fetchGetMovieCast(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`);
}

export function fetchGetMovieReviews(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}`);
}
