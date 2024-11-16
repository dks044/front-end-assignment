'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useRef } from 'react'
import { useIsBottom } from '../hooks/use-is-bottom'

export default function QuotesPage() {
  const bottomRef = useRef(null)
  const isBottom = useIsBottom(bottomRef)
  const { quotes, isLoading } = useInfiniteQuotes(isBottom)

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
          isFavorite={false}
          onFavorite={() => {
            console.log('Clicked on favorite')
          }}
        />
      ))}
      <div ref={bottomRef} />
    </>
  )
}
