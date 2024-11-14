'use client'

import { use } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'
import { ProductThumbnail } from './components/product-thumbnail'
import ClipLoader from 'react-spinners/ClipLoader'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { Button } from '@/components/ui/button'
import { TbHandFinger } from 'react-icons/tb'
import { FaCartArrowDown } from 'react-icons/fa'

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
            <h3 className="text-xl font-semibold text-gray-800 md:mt-2">
              {data.title}
            </h3>
            <h3 className="text-lg text-gray-500">{data.category}</h3>
            <p className="text-lg font-semibold text-gray-800">{data.price}$</p>
            <p className="text-gray-600">{data.description}</p>

            {/* 태그 표시 */}
            <div className={'flex flex-wrap items-center gap-1'}>
              {data.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            {/* 평점 및 리뷰 수 */}
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-800">
                <RatingStars rating={data.rating} />
              </span>
              <span className="ml-2 text-gray-500">
                ({data.reviews.length} reviews)
              </span>
            </div>

            {/* 재고 상태 */}
            <p
              className={`text-lg font-semibold ${data.stock > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {data.stock > 0 ? 'In stock' : 'Out of stock'}{' '}
              <span className="text-sm text-gray-400">({data.stock}ea)</span>
            </p>

            {/* 배송 정보 */}
            <p className="font-semibold text-gray-600">
              Shipping Information:{' '}
              <span className="text-sm text-gray-400">
                {data.shippingInformation}
              </span>
            </p>

            {/* 보증 정보 */}
            <p className="font-semibold text-gray-600">
              Warranty information:{' '}
              <span className="text-sm text-gray-400">
                {data.warrantyInformation}
              </span>
            </p>

            {/* 반품 정책 */}
            <p className="font-semibold text-gray-600">
              Return Policy:{' '}
              <span className="text-sm text-gray-400">{data.returnPolicy}</span>
            </p>

            {/* 최소 주문 수량 */}
            <p className="font-semibold text-gray-600">
              Minimum order quantity:{' '}
              <span className="text-sm text-gray-400">
                {data.minimumOrderQuantity}
              </span>
            </p>

            {/* 주문 & 카트 */}
            <div className="flex h-44 flex-col gap-3 lg:flex-row">
              <Button className="w-full lg:mt-2 lg:w-44">
                <TbHandFinger />
                Order
              </Button>
              <Button className="w-full bg-slate-700 hover:bg-slate-900 lg:mt-2 lg:w-44">
                <FaCartArrowDown />
                Cart
              </Button>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}
