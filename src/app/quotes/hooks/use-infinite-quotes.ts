import { getQuotes } from '@/actions/get-quotes'
import { QuoteListItem } from '@/schemas/quotes'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useInfiniteQuotes = (isBottom: boolean) => {
  const [sequence, setSequence] = useState<number>(-1)
  const [quotes, setQuotes] = useState<QuoteListItem[]>([])

  useEffect(() => {
    if (isBottom) {
      setSequence((prev) => prev + 1)
    }
  }, [isBottom])

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['quotes', sequence],
    queryFn: async () => {
      const res = await getQuotes({
        limit: 30,
        skip: 30 * sequence,
      })
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return res.data
    },
    enabled: isBottom,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setQuotes((prev) => {
        const newQuotes = data.quotes.filter(
          (newQuote: QuoteListItem) => !prev.some((q) => q.id === newQuote.id)
        )
        return [...prev, ...newQuotes]
      })
    }
  }, [isSuccess, data])

  return { quotes, isLoading }
}
