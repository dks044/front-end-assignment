'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { QuoteListItem } from '@/schemas/quotes'
import { useFavoriteQuotes } from '../hooks/use-favorite-quotes'
import { useIsScroll } from '../hooks/use-is-scroll'

export default function QuotesPage() {
  const isScroll = useIsScroll()
  const { quotes, isLoading } = useInfiniteQuotes(isScroll, true)
  const { userQuotes, setQuotes } = useFavoriteQuotes()

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
    </>
  )
}
