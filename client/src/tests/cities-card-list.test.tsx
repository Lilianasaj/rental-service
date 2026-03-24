import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react'; // добавьте fireEvent
import { MemoryRouter } from 'react-router-dom';
import { CitiesCardList } from '../components/cities-card-list/cities-card-list';
import { makeFakeOffer } from './mocks';

describe('CitiesCardList', () => {
  const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
  const mockOnMouseEnter = vi.fn();
  const mockOnMouseLeave = vi.fn();

  const renderList = (offers = mockOffers) => {
    return render(
      <MemoryRouter>
        <CitiesCardList
          offersList={offers}
          onMouseEnter={mockOnMouseEnter}
          onMouseLeave={mockOnMouseLeave}
        />
      </MemoryRouter>
    );
  };

  it('отображает правильное количество карточек', () => {
    renderList();
    const cards = document.querySelectorAll('.cities__card');
    expect(cards).toHaveLength(mockOffers.length);
  });

  it('отображает заголовки всех предложений', () => {
    renderList();
    mockOffers.forEach((offer) => {
      expect(document.body.textContent).toContain(offer.title);
    });
  });

  it('отображает цены всех предложений', () => {
    renderList();
    mockOffers.forEach((offer) => {
      expect(document.body.textContent).toContain(`€${offer.price}`);
    });
  });

  it('передает корректные пропсы в дочерние компоненты', () => {
    renderList();
    const firstCard = document.querySelector('.cities__card');
    expect(firstCard).toBeDefined();
    
    if (firstCard) {
      fireEvent.mouseEnter(firstCard); // используем fireEvent
      expect(mockOnMouseEnter).toHaveBeenCalledWith(mockOffers[0].id);
    }
  });

  it('корректно работает с пустым списком', () => {
    renderList([]);
    const cards = document.querySelectorAll('.cities__card');
    expect(cards).toHaveLength(0);
  });
});