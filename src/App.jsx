import './App.css'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'
import { useMovies } from './hooks/useMovies'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const { err, search, setSearch } = useSearch()
  const {
    mappedMovies: movies,
    searchMovies,
    isLoading
  } = useMovies({ search, sort })

  const debounceSearch = useCallback(
    debounce((search) => {
      searchMovies({ search })
    }, 500),
    [searchMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    searchMovies({ search })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    if (newSearch === ' ') return
    setSearch(newSearch)
    debounceSearch(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='App'>
      <header className='header'>
        <h1>MoviesApp 🎬</h1>
        <form
          onSubmit={handleSubmit}
          className='form'
        >
          <input
            value={search}
            onChange={handleChange}
            type='text'
            placeholder='Matrix, Avengers, The Hobbit...'
          />
          {err && (
            <p
              style={{ fontSize: '1.4rem', color: 'red', textAlign: 'center' }}
            >
              {err}
            </p>
          )}
          <label
            htmlFor='sortedMovies'
            className='labelSort'
          >
            Sort movies by letters
            <input
              type='checkbox'
              id='sortedMovies'
              onChange={handleSort}
              value={sort}
            />
          </label>
          <button>Search Movie</button>
        </form>
      </header>
      <main className='main'>
        {isLoading && <p>Cargando....</p>}
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
