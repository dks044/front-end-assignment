import React from 'react'
import { Review } from '@/schemas/product'
import Modal from '@/components/modals/Modal'
import { RatingStars } from '@/components/rating-stars'

interface ProductReviewsModalProps {
  isOpen: boolean
  onClose: () => void
  reviews: Review[]
}

export function ProductReviewsModal({
  isOpen,
  onClose,
  reviews,
}: ProductReviewsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold">Product Reviews</h2>
      <div className="mt-4">
        {reviews.map((review) => (
          <div
            key={`${review.reviewerEmail}-${review.date}`}
            className="mb-4 border-b p-4"
          >
            <div className="flex items-center">
              <RatingStars rating={review.rating} />
              <span className="ml-2 text-sm text-gray-600">
                {review.reviewerName}
              </span>
            </div>
            <p className="mt-2 text-gray-800">{review.comment}</p>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  )
}
