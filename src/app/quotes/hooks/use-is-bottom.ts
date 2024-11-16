import { useEffect, useState, RefObject } from 'react'

export function useIsBottom(contentRef: RefObject<HTMLElement>) {
  const [isBottom, setIsBottom] = useState(false)

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY
    const bottomPosition = document.documentElement.offsetHeight

    setIsBottom(scrollPosition >= bottomPosition)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    handleScroll()
  }, [contentRef])

  return isBottom
}
