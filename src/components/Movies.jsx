function MoviesList({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img
            src={movie.poster}
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  )
}

function NoMovies() {
  return <p style={{textAlign: 'center', margin: '2rem', fontSize: '1.5rem'}}>No Results matched</p>
}

export function Movies({ movies = [] }) {
  const hasMovies = movies.length > 0

  return hasMovies ? <MoviesList movies={movies} /> : <NoMovies />
}
