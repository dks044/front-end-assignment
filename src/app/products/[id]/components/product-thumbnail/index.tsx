'use client'
import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { ProductDetailThumbnail } from '@/schemas/product'
import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaCircle } from 'react-icons/fa'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'

export interface ProductThumbnailProps {
  ProductThumbnail: ProductDetailThumbnail
}

export function ProductThumbnail({
  ProductThumbnail,
}: ProductThumbnailProps & HTMLAttributes<HTMLDivElement>) {
  const { thumbnail, images, discountPercentage } = ProductThumbnail
  const [currentIndex, setCurrentIndex] = useState(0)
  const slideImages = images.map((src, index) => ({
    index,
    src,
  }))

  // 초기 상태 설정(썸네일)
  const [currentImage, setCurrentImage] = useState<string>(
    slideImages[0]?.src || thumbnail
  )

  //슬라이드쇼 이미지 업데이트
  useEffect(() => {
    setCurrentImage(slideImages[currentIndex]?.src || thumbnail)
  }, [currentIndex, slideImages, thumbnail])

  const handleSlide = useCallback(
    (action: string) => {
      setCurrentIndex((prevIndex) => {
        if (action === 'prev') {
          return prevIndex === 0 ? slideImages.length - 1 : prevIndex - 1
        }
        if (action === 'next') {
          return prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
        }
        return prevIndex
      })
    },
    [slideImages.length]
  )

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
          //스켈레톤 UI
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
        {slideImages.map((image) => (
          <div key={image.index}>
            <FaCircle
              className={clsx(
                image.src === currentImage ? 'text-gray-900' : 'text-gray-400',
                `transition`
              )}
            />
          </div>
        ))}
      </div>
    </article>
  )
}
