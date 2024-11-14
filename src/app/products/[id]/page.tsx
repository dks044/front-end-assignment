'use client'

import { use } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'
import { ProductThumbnail } from './components/product-thumbnail'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useProduct(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div>
      {data && (
        <div className="flex gap-5">
          <div className="h-64 flex-1">
            <ProductThumbnail
              ProductThumbnail={{
                thumbnail: data.thumbnail,
                images: data.images,
                discountPercentage: data.discountPercentage,
              }}
            />
          </div>
          <div className="flex-1">
            <p>title</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
              ratione veritatis repudiandae quae, officiis voluptates nihil
              saepe dignissimos repellat velit, provident placeat fugiat ea nisi
              facilis molestias iure quos magni.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
