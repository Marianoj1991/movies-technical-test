import { useCallback, useRef, useState } from 'react'
import { getMovies } from '../services/get-movies'


export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const lastSearch = useRef(search)

  const searchMovies = useCallback(async ({ search }) => {
    if (lastSearch.current === search) return
    try {
      setIsLoading(true)
      setError(null)
      lastSearch.current = search
      const newMovies = await getMovies({ search })
      setMovies(newMovies)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const mappedMovies = sort
  ? [...movies].sort((a,b) => (a.title).localeCompare(b.title) )
  : movies

  return {
    searchMovies,
    mappedMovies,
    isLoading,
    error
  }
}
