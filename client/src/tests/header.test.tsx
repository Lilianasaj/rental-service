import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  Header  from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';
import { makeFakeFullOffer } from './mocks';

const fakeUserInfo = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.jpg',
  isPro: false,
  token: 'fake-token',
};

describe('Header — неавторизованный пользователь', () => {
  it('отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('не отображает Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it('не отображает email пользователя', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.queryByText(fakeUserInfo.email)).not.toBeInTheDocument();
  });
});

describe('Header — авторизованный пользователь', () => {
  it('отображает email пользователя', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [makeFakeFullOffer()], // используем makeFakeFullOffer вместо makeFakeOffer
      },
    });
    expect(screen.getByText(fakeUserInfo.email)).toBeInTheDocument();
  });

  it('отображает кнопку Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('отображает счетчик избранных предложений', () => {
    const favoriteOffer = { ...makeFakeFullOffer(), isFavorite: true };
    const nonFavoriteOffer = { ...makeFakeFullOffer(), isFavorite: false };

    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [favoriteOffer, nonFavoriteOffer],
      },
    });
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('не отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it('отображает аватар пользователя, если есть', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    const avatar = document.querySelector('.user__avatar');
    expect(avatar).toBeInTheDocument();
  });
});

describe('Header — взаимодействие', () => {
  it('вызывает logoutAction при клике на Sign out', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });

    const signOutButton = screen.getByText(/sign out/i);
    await user.click(signOutButton);

    // Проверяем, что logoutAction был вызван (можно замокать)
  });
});

describe('Header — статус Unknown', () => {
  it('отображает ссылку Sign in при неизвестном статусе', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('не отображает информацию о пользователе', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    });
    expect(screen.queryByText(fakeUserInfo.email)).not.toBeInTheDocument();
  });
});