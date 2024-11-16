import { useCallback, useEffect, useState } from 'react'

//이미지 슬라이드쇼 용도
export function useSlider(images: string[], initialIndex: number = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [currentImage, setCurrentImage] = useState<string>(images[initialIndex])

  useEffect(() => {
    setCurrentImage(images[currentIndex])
  }, [currentIndex, images])

  const handleSlide = useCallback(
    (action: 'prev' | 'next') => {
      setCurrentIndex((prevIndex) => {
        if (action === 'prev') {
          return prevIndex === 0 ? images.length - 1 : prevIndex - 1
        }
        if (action === 'next') {
          return prevIndex === images.length - 1 ? 0 : prevIndex + 1
        }
        return prevIndex
      })
    },
    [images.length]
  )

  return { currentImage, handleSlide }
}
