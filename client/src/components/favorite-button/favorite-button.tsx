import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteStatusAction } from '../../store/api-actions';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  variant?: 'card' | 'offer';
};

function FavoriteButton({ offerId, isFavorite, variant = 'card' }: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const displayedIsFavorite = isAuthorized ? isFavorite : false;

  const baseClassName = variant === 'offer'
    ? 'offer__bookmark-button button'
    : 'place-card__bookmark-button button';
  const activeClassName = variant === 'offer'
    ? 'offer__bookmark-button--active'
    : 'place-card__bookmark-button--active';
  const iconClassName = variant === 'offer'
    ? 'offer__bookmark-icon'
    : 'place-card__bookmark-icon';
  const iconWidth = variant === 'offer' ? 31 : 18;
  const iconHeight = variant === 'offer' ? 33 : 19;

  const handleClick = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(toggleFavoriteStatusAction({
        offerId,
        status: isFavorite ? 0 : 1,
      })).unwrap();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className={`${baseClassName} ${displayedIsFavorite ? activeClassName : ''}`.trim()}
      type="button"
      onClick={handleClick}
      disabled={isSubmitting}
      aria-label={displayedIsFavorite ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <svg
        className={iconClassName}
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 17 18"
        aria-hidden="true"
      >
        <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" />
      </svg>
      <span className="visually-hidden">{displayedIsFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export { FavoriteButton };