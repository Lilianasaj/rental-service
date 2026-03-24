import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoadingScreen from '../components/loading-page/loading-page';
import PageNotFound from '../pages/page-not-found/page-not-found';
import { AppRoute } from '../const';

describe('LoadingPage', () => {
  it('отображает текст загрузки', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/загрузка предложений/i)).toBeInTheDocument(); // исправлено
  });

  it('отображает спиннер загрузки', () => {
    render(<LoadingScreen />);
    const spinner = document.querySelector('[style*="animation: spin"]'); // ищем по анимации
    expect(spinner).toBeInTheDocument();
  });
});

describe('PageNotFound', () => {
  const renderPage = () => render(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );

  it('отображает заголовок PAGE NOT FOUND', () => {
    renderPage();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });

  it('ссылка на главную страницу присутствует', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /вернуться на главную/i });
    expect(link).toBeInTheDocument();
  });

  it('ссылка ведет на главную страницу', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /вернуться на главную/i });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});