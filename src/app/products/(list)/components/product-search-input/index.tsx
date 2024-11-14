'use client'
import { useEffect, useState, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useProductsSearchParams } from '@/app/products/(list)/hooks/use-products-search-params'

// TODO: 현재 검색창이 제대로 동작하지 않습니다. 수정해주세요.

export function ProductSearchInput({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { term, handleTermChange } = useProductsSearchParams()
  const [inputValue, setInputValue] = useState(term)
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    //이전에 설정된 타이머가 있다면, 그 타이머를 취소하여 불필요한 API 호출을 방지한다
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    const timeout = setTimeout(() => {
      handleTermChange(value)
    }, 300)
    setDebounceTimeout(timeout)
  }

  useEffect(() => {
    setInputValue(term)
  }, [term])

  return (
    <main className={cn('relative', className)} {...props}>
      <Input
        value={inputValue}
        onChange={handleChange}
        className={'h-12 pl-12 text-base'}
        placeholder={'Search product'}
      />
      <SearchIcon className={'absolute left-3 top-1/2 -translate-y-1/2'} />
    </main>
  )
}
