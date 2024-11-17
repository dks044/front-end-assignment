import { useEffect, useState } from 'react'

export function useIsScroll(): boolean {
  const [isScroll, setIsScroll] = useState<boolean>(false)
  const [initialScroll, setInitialScroll] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll - initialScroll >= 1100) {
        setIsScroll(true)
        setInitialScroll(currentScroll)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    setInitialScroll(window.scrollY)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [initialScroll])

  return isScroll
}
