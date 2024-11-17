import { getQuotes } from '@/actions/get-quotes'
import { QuoteListItem } from '@/schemas/quotes'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useInfiniteQuotes = (isScroll: boolean, mount: boolean) => {
  const [onMounted, setOnMounted] = useState(mount)
  const [sequence, setSequence] = useState<number>(-1)
  const [quotes, setQuotes] = useState<QuoteListItem[]>([])

  useEffect(() => {
    if (isScroll) {
      setSequence((prev) => prev + 1)
    }
  }, [isScroll])

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
      setOnMounted(false)
      return res.data
    },
    //초기 상태이거나, 스크롤 이벤트가 발생했을떄만
    enabled: isScroll || onMounted,
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
