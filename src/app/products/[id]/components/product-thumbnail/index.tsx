'use client'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { ProductDetailThumbnail } from '@/schemas/product'
import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaCircle } from 'react-icons/fa'
import clsx from 'clsx'

export interface ProductThumbnailProps {
  ProductThumbnail: ProductDetailThumbnail
}

export function ProductThumbnail({
  ProductThumbnail,
}: ProductThumbnailProps & HTMLAttributes<HTMLDivElement>) {
  const { thumbnail, images } = ProductThumbnail
  const [currentImage, setCurrentImage] = useState<string>(
    images[0] ? images[0] : thumbnail
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const slideImages = images.map((src, index) => ({
    index,
    src,
  }))

  useEffect(() => {
    setCurrentImage(slideImages[currentIndex].src)
  }, [slideImages, currentIndex])

  const handleSlide = (action: string) => {
    if (action === 'prev') {
      if (currentIndex === 0) {
        setCurrentIndex(slideImages?.length - 1)
      } else {
        setCurrentIndex(currentIndex - 1)
      }
    }
    if (action === 'next') {
      if (currentIndex === slideImages?.length - 1) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  return (
    <div className="relative flex w-full items-center justify-center rounded-md ring-1 ring-lime-600">
      <div className="relative ml-2 h-64 w-full lg:size-[25rem]">
        <Image
          fill
          alt="Thumbnail"
          src={currentImage}
          className="object-cover transition"
        />
      </div>
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
    </div>
  )
}
