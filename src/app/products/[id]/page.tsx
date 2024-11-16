'use client'

import { use } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'
import { ProductThumbnail } from './components/product-thumbnail'
import ClipLoader from 'react-spinners/ClipLoader'
import { ProductDetail } from './components/product-detail.tsx'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useProduct(id)

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <ClipLoader color="#15cf97" size={100} />
      </div>
    )
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main>
      {data && (
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
          {/* 썸네일 */}
          <section className="h-72 flex-1">
            <ProductThumbnail
              ProductThumbnail={{
                id: data.id,
                thumbnail: data.thumbnail,
                images: data.images,
                discountPercentage: data.discountPercentage,
              }}
            />
          </section>

          <aside className="flex flex-1 flex-col space-y-2">
            <ProductDetail productDetail={data} />
          </aside>
        </div>
      )}
    </main>
  )
}
