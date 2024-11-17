import { useEffect, useState, useCallback } from 'react'
import { QuoteListItem } from '@/schemas/quotes'

export const useFavoriteQuotes = () => {
  const [userQuotes, setUserQuotes] = useState<QuoteListItem[]>([])

  useEffect(() => {
    const userFavoriteQuotes = localStorage.getItem('userQuotes')
    if (userFavoriteQuotes) {
      const parsedQuotes: QuoteListItem[] = JSON.parse(userFavoriteQuotes)
      setUserQuotes(parsedQuotes)
    }
  }, [])

  const setQuotes = useCallback((quote: QuoteListItem) => {
    setUserQuotes((prevQuotes) => {
      let updatedQuotes
      if (prevQuotes.some((q) => q.id === quote.id)) {
        updatedQuotes = prevQuotes.filter((q) => q.id !== quote.id)
      } else {
        updatedQuotes = [...prevQuotes, quote]
      }
      localStorage.setItem('userQuotes', JSON.stringify(updatedQuotes))
      return updatedQuotes
    })
  }, [])

  return { userQuotes, setQuotes }
}
