function NotFoundPage(): React.JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="Rent service logo" width="81" height="41" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--404">
        <div className="page__404-container container">
          <section className="404">
            <h1 className="404__title">404 - Page Not Found</h1>
            <p className="404__text">The page you are looking for does not exist.</p>
            <a className="404__link" href="/">Go to main page</a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;