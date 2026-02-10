import { useState, FormEvent, Fragment } from 'react';

// ВРЕМЕННО: SVG спрайт для иконок
const SvgSprite = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <symbol id="icon-star" viewBox="0 0 13 12">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
      />
    </symbol>
  </svg>
);

type ReviewFormProps = {
  onAddReview: (reviewData: { comment: string; rating: number }) => void;
};

function ReviewForm({ onAddReview }: ReviewFormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    console.log('=== SUBMITTING FORM ===');
    console.log('Comment:', comment);
    console.log('Rating:', rating);
    
    if (comment.length < 50 || rating === 0) {
      console.log('Validation failed!');
      return;
    }

    // Вызываем функцию родителя
    onAddReview({
      comment,
      rating,
    });
    
    // Сбрасываем форму
    setComment('');
    setRating(0);
    
    console.log('Form cleared!');
  };

  const handleRatingChange = (value: number) => {
    console.log('Rating changed to:', value);
    setRating(value);
  };

  const handleCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  return (
    <>
      <SvgSprite />
      
      <form 
        className="reviews__form form" 
        action="#" 
        method="post"
        onSubmit={handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        
        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((value) => (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                checked={rating === value}
                onChange={() => handleRatingChange(value)}
              />
              <label
                htmlFor={`${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={
                  value === 5 ? 'perfect' :
                  value === 4 ? 'good' :
                  value === 3 ? 'not bad' :
                  value === 2 ? 'badly' :
                  'terribly'
                }
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
        </div>
        
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={comment}
          onChange={handleCommentChange}
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
            disabled={comment.length < 50 || rating === 0}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export { ReviewForm };