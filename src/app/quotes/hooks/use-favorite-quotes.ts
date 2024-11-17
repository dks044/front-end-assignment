'use client'
import { QuoteListItem } from '@/schemas/quotes'
import { useEffect, useState } from 'react'

export const useFavoriteQuotes = () => {
  const [userQuotes, setUserQuotes] = useState<QuoteListItem[]>([])

  const userFavoriteQuotes = localStorage.getItem('userQuotes')

  useEffect(() => {
    if (userFavoriteQuotes) {
      const parsedQuotes: QuoteListItem[] = JSON.parse(userFavoriteQuotes)
      setUserQuotes(parsedQuotes)
    } else {
      setUserQuotes([])
    }
  }, [userFavoriteQuotes])

  return { userQuotes, setUserQuotes }
}
