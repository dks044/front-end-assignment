'use client'
import React, { HTMLAttributes } from 'react'
import { ProductDetailThumbnail } from '@/schemas/product'
import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaCircle } from 'react-icons/fa'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { useSlider } from '../../hooks/use-slider'

export interface ProductThumbnailProps {
  ProductThumbnail: ProductDetailThumbnail
}

export function ProductThumbnail({
  ProductThumbnail,
}: ProductThumbnailProps & HTMLAttributes<HTMLDivElement>) {
  const { images, discountPercentage } = ProductThumbnail
  const slideImages = images.map((src) => src) // 이미지 URL 배열

  const { currentImage, handleSlide } = useSlider(slideImages, 0)

  return (
    <article className="relative flex h-[29rem] w-full items-center justify-center rounded-md ring-1 ring-lime-600">
      <div className="absolute left-5 top-5 font-bold text-red-500">
        <Badge variant={'destructive'}>{discountPercentage}% Sale</Badge>
      </div>
      <div className="relative ml-2 h-64 w-full overflow-hidden lg:size-[25rem]">
        <Image
          fill
          alt="Thumbnail"
          src={currentImage}
          className="object-cover"
          priority
          // 스켈레톤 UI
          placeholder="blur"
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </div>
      {/* 슬라이드쇼 화살표 버튼 */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <IoIosArrowBack
          className="cursor-pointer text-4xl text-lime-400 transition hover:text-lime-500"
          onClick={() => handleSlide('prev')}
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <IoIosArrowForward
          className="cursor-pointer text-4xl text-lime-400 transition hover:text-lime-500"
          onClick={() => handleSlide('next')}
        />
      </div>
      <div className="absolute bottom-1 flex justify-center gap-1">
        {slideImages.map((image, index) => (
          <div key={index}>
            <FaCircle
              className={clsx(
                image === currentImage ? 'text-gray-900' : 'text-gray-400',
                `transition`
              )}
            />
          </div>
        ))}
      </div>
    </article>
  )
}
