import { JSX } from 'react';

function LoadingScreen(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
      }}
    >
      <p>Loading ...</p>
    </div>
  );
}

export { LoadingScreen };