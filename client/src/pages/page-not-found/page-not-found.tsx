import { Link } from 'react-router-dom';
import { Logo } from '../../components/logo/logo';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main container" style={{ paddingTop: '40px' }}>
        <h1>PAGE NOT FOUND</h1>
        <p>Извините, такой страницы не существует.</p>

        <Link
          to={AppRoute.Main}
          className="button"
          style={{
            marginTop: '20px',
            display: 'inline-block',
            color: '#4481c3',
          }}
        >
          Перейдите на главную страницу
        </Link>
      </main>
    </div>
  );
}

export default NotFoundPage;