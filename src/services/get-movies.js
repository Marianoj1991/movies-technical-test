const API_KEY = '24c5285b'

export function getMovies({ search }) {
  if (!search) return
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    .then((res) => res.json())
    .then(({ Search }) => {
      return Search?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))
    })
}
