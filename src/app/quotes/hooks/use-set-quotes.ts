import { QuoteListItem } from '@/schemas/quotes'
import { useCallback } from 'react'
import { useFavoriteQuotes } from './use-favorite-quotes'

export default function useSetQuotes() {
  const { setUserQuotes } = useFavoriteQuotes()

  const quoteHandler = useCallback(
    (quote: QuoteListItem) => {
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
    },
    [setUserQuotes]
  )

  return quoteHandler
}
