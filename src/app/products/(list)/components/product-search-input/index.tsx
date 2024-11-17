'use client'
import { useEffect, useState, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useProductsSearchParams } from '@/app/products/(list)/hooks/use-products-search-params'
import { useDebounce } from '../../hooks/use-debounce'

export function ProductSearchInput({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { term, handleTermChange } = useProductsSearchParams()
  const [inputValue, setInputValue] = useState(term)

  const debouncedValue = useDebounce(inputValue, 300)

  useEffect(() => {
    setInputValue(term)
  }, [term])

  useEffect(() => {
    handleTermChange(debouncedValue)
  }, [debouncedValue, handleTermChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

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
