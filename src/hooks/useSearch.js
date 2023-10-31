import { useEffect, useRef, useState } from "react"

export function useSearch() {
  const [search, setSearch] = useState('')
  const [err, setErr] = useState(null)
  const firstSearch = useRef(true)

  useEffect(() => {

    if(firstSearch.current) {
      firstSearch.current = search.length === 0
      return
    }

    if (search === '') {
      setErr(`Ingrese el nombre de alguna pelicula`)
      return
    }

    if (search.length < 2) {
      setErr(`La pelicula debe tener al menos dos caracteres`)
      return
    }

    setErr(null)
  }, [search])

  return { 
    err,
    search,
    setSearch
  }
}
