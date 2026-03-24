import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'; // добавьте fireEvent
import { MemoryRouter } from 'react-router-dom';
import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer } from './mocks';
import { AppRoute } from '../const';

describe('CitiesCard', () => {
  const mockOffer = makeFakeOffer();
  const mockOnMouseEnter = vi.fn();
  const mockOnMouseLeave = vi.fn();

  const renderCard = (props = {}) => {
    return render(
      <MemoryRouter>
        <CitiesCard
          id={mockOffer.id}
          title={mockOffer.title}
          type={mockOffer.type}
          price={mockOffer.price}
          previewImage={mockOffer.previewImage}
          isPremium={mockOffer.isPremium}
          rating={mockOffer.rating}
          onMouseEnter={mockOnMouseEnter}
          onMouseLeave={mockOnMouseLeave}
          {...props}
        />
      </MemoryRouter>
    );
  };

  it('заголовок объявления отображается на карточке', () => {
    renderCard();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('цена объявления присутствует в разметке', () => {
    renderCard();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('метка "Premium" отображается когда isPremium = true', () => {
    renderCard({ isPremium: true });
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('метка "Premium" отсутствует когда isPremium = false', () => {
    renderCard({ isPremium: false });
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href', () => {
    renderCard();
    const links = screen.getAllByRole('link');
    const expectedHref = `/offer/${mockOffer.id}`;
    
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', expectedHref);
    });
  });

  it('отображает изображение предложения', () => {
    renderCard();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockOffer.previewImage);
    expect(image).toHaveAttribute('alt', 'Place image');
  });

  it('отображает рейтинг в процентах', () => {
    renderCard();
    const expectedWidth = `${(mockOffer.rating / 5) * 100}%`;
    const ratingSpan = document.querySelector('.place-card__stars span');
    expect(ratingSpan).toHaveStyle(`width: ${expectedWidth}`);
  });

  it('отображает тип жилья на карточке', () => {
    renderCard();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
  });

  it('вызывает onMouseEnter при наведении', () => {
    renderCard();
    const article = document.querySelector('.cities__card');
    expect(article).toBeDefined();
    
    if (article) {
      fireEvent.mouseEnter(article); // используем fireEvent
      expect(mockOnMouseEnter).toHaveBeenCalledWith(mockOffer.id);
    }
  });

  it('вызывает onMouseLeave при уходе мыши', () => {
    renderCard();
    const article = document.querySelector('.cities__card');
    expect(article).toBeDefined();
    
    if (article) {
      fireEvent.mouseLeave(article); // используем fireEvent
      expect(mockOnMouseLeave).toHaveBeenCalled();
    }
  });
});