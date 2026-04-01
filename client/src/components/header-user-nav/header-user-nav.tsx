import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { AuthorizationStatusType } from '../../types/authorization-status';

type HeaderUserNavProps = {
  authorizationStatus: AuthorizationStatusType;
  email?: string;
  favoriteOffersCount: number;
  onLogout: () => void;
};

function HeaderUserNav({
  authorizationStatus,
  email,
  favoriteOffersCount,
  onLogout,
}: HeaderUserNavProps): JSX.Element {
  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">{email}</span>
          <span className="header__favorite-count">{favoriteOffersCount}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <button className="header__nav-link button" type="button" onClick={onLogout}>
          <span className="header__signout">Sign out</span>
        </button>
      </li>
    </ul>
  );
}

export { HeaderUserNav };