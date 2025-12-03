import React, { useState } from 'react';

function ReviewForm(): React.JSX.Element {
  const [rating, setRating] = useState<string>('');
  const [review, setReview] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки отзыва
    console.log({ rating, review });
    setRating('');
    setReview('');
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const isSubmitDisabled = !rating || review.length < 50 || review.length > 300;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star.toString()}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star.toString()}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={['terribly', 'badly', 'not bad', 'good', 'perfect'][star - 1]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
        minLength={50}
        maxLength={300}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;