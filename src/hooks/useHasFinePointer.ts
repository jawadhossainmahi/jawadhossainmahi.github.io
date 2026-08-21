import { useEffect, useState } from 'react'

export function useHasFinePointer(): boolean {
  const [fine, setFine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const listener = (e: MediaQueryListEvent) => setFine(e.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  return fine
}
