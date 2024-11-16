'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useRef } from 'react'
import { useIsBottom } from '../hooks/use-is-bottom'
import { QuoteListItem } from '@/schemas/quotes'
import { useFavoriteQuotes } from '../hooks/use-favorite-quotes'
import useSetQuotes from '../hooks/use-set-quotes'

export default function QuotesPage() {
  const bottomRef = useRef(null)
  const isBottom = useIsBottom(bottomRef)
  const { quotes, isLoading } = useInfiniteQuotes(isBottom)
  const { userQuotes } = useFavoriteQuotes()
  const setQuotes = useSetQuotes()

  if (isLoading && quotes.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      {quotes?.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote.quote}
          author={quote.author}
          isFavorite={
            userQuotes
              ? userQuotes.some((q: QuoteListItem) => q.id === quote.id)
              : false
          }
          onFavorite={() => setQuotes(quote)}
        />
      ))}
      <div ref={bottomRef} />
    </>
  )
}
