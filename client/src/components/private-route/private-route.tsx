import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type AuthorizationStatusEnum = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatusEnum;
  children: React.ReactNode;
};

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <>{children}</>
      : <Navigate to={AppRoute.Login} />
  );
}

export { PrivateRoute };