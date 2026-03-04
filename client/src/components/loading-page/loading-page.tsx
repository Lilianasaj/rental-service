import React from 'react';

function LoadingPage(): JSX.Element {
  const styles = {
    container: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      zIndex: 9999,
    },
    spinnerWrapper: {
      textAlign: 'center' as const,
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px',
    },
    text: {
      fontSize: '16px',
      color: '#666',
      fontFamily: 'Arial, sans-serif',
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={styles.spinnerWrapper}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>Загрузка предложений...</p>
      </div>
    </div>
  );
}

export default LoadingPage;