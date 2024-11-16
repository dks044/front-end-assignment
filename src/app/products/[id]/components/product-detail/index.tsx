'use client'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { Button } from '@/components/ui/button'
import { TbHandFinger } from 'react-icons/tb'
import { FaCartArrowDown } from 'react-icons/fa'
import { ProductDetail as ProductDetailType } from '@/schemas/product'
import { ProductReviewsModal } from '../product-reviews-modal'
import { MdOutlineReviews } from 'react-icons/md'

interface ProductDetailProps {
  productDetail: ProductDetailType
}

export function ProductDetail({ productDetail }: ProductDetailProps) {
  const {
    title,
    category,
    price,
    description,
    tags,
    rating,
    reviews,
    stock,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    minimumOrderQuantity,
  } = productDetail
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false)

  return (
    <>
      <ProductReviewsModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        reviews={reviews}
      />
      <h3 className="text-xl font-semibold text-gray-800 md:mt-2">{title}</h3>
      <h3 className="text-lg text-gray-500">{category}</h3>
      <p className="text-lg font-semibold text-gray-800">{price}$</p>
      <p className="text-gray-600">{description}</p>

      {/* 태그 표시 */}
      <div className={'flex flex-wrap items-center gap-1'}>
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {/* 평점 및 리뷰 수 */}
      <div className="flex items-center">
        <span className="text-lg font-semibold text-gray-800">
          <RatingStars rating={rating} />
        </span>
        <span className="ml-2 text-gray-500">({reviews.length} reviews)</span>
      </div>

      {/* 재고 상태 */}
      <p
        className={`text-lg font-semibold ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}
      >
        {stock > 0 ? 'In stock' : 'Out of stock'}{' '}
        <span className="text-sm text-gray-400">({stock}ea)</span>
      </p>

      {/* 배송 정보 */}
      <p className="font-semibold text-gray-600">
        Shipping Information:{' '}
        <span className="text-sm text-gray-400">{shippingInformation}</span>
      </p>

      {/* 보증 정보 */}
      <p className="font-semibold text-gray-600">
        Warranty information:{' '}
        <span className="text-sm text-gray-400">{warrantyInformation}</span>
      </p>

      {/* 반품 정책 */}
      <p className="font-semibold text-gray-600">
        Return Policy:{' '}
        <span className="text-sm text-gray-400">{returnPolicy}</span>
      </p>

      {/* 최소 주문 수량 */}
      <p className="font-semibold text-gray-600">
        Minimum order quantity:{' '}
        <span className="text-sm text-gray-400">{minimumOrderQuantity}</span>
      </p>

      {/* 주문 & 카트 & 리뷰 버튼 */}
      <div className="flex h-44 flex-col gap-3 lg:flex-row">
        <Button className="w-full lg:mt-2 lg:w-44">
          <TbHandFinger />
          Order
        </Button>
        <Button className="w-full bg-slate-700 hover:bg-slate-900 lg:mt-2 lg:w-44">
          <FaCartArrowDown />
          Cart
        </Button>
        <Button
          className="w-full bg-orange-700 hover:bg-orange-800 lg:mt-2 lg:w-44"
          onClick={() => setReviewModalOpen(true)}
        >
          <MdOutlineReviews />
          Review
        </Button>
      </div>
    </>
  )
}
