'use client'
import { useFavoriteQuotes } from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import useSetQuotes from '../hooks/use-set-quotes'

export default function FavoriteQuotesPage() {
  const { userQuotes } = useFavoriteQuotes()
  const setQuotes = useSetQuotes()

  return (
    <div>
      <h1
        className={'mb-4 text-3xl font-bold italic text-secondary-foreground'}
      >
        My Favorite
      </h1>
      <ul>
        {userQuotes?.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote.quote}
            author={quote.author}
            isFavorite={true}
            onFavorite={() => setQuotes(quote)}
          />
        ))}
      </ul>
    </div>
  )
}
