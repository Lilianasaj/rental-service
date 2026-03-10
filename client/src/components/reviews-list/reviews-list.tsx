import { Review } from '../../types/review';
import { ReviewItem } from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  // Защита от undefined
  const safeReviews = reviews || [];
  
  return (
    <div className="reviews__list">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{safeReviews.length}</span>
      </h2>
      {safeReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

export { ReviewsList };