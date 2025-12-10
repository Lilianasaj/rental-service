import { Logo } from '../../components/logo/logo';

function NotFoundPage(): React.JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--404">
        <div className="page__404-container container">
          <section className="not-found">
            <h1 className="not-found__title">404 - Page Not Found</h1>
            <p className="not-found__text">The page you are looking for does not exist.</p>
            <a className="not-found__link" href="/">Go to main page</a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;