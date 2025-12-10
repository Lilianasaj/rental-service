// src/components/map/map.tsx
import { useEffect, useRef } from 'react';

// Используем глобальный Leaflet из CDN
declare global {
  interface Window {
    L: any;
  }
}

const L = window.L;

type MapProps = {
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  points: Array<{
    id: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }>;
  className: string;
};

function Map({ city, points, className }: MapProps): React.JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current || !L) {
      console.log('Leaflet не загружен или элемент не найден');
      return;
    }

    // Инициализация
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapInstanceRef.current);
    }

    // Очистка старых маркеров
    markersRef.current.forEach(marker => {
      if (marker && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];

    // Добавление новых маркеров
    points.forEach(point => {
      if (mapInstanceRef.current) {
        const marker = L.marker([point.location.latitude, point.location.longitude])
          .addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
      }
    });

    // Обновление центра
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    // Очистка
    return () => {
      markersRef.current.forEach(marker => {
        if (marker && mapInstanceRef.current) {
          mapInstanceRef.current.removeLayer(marker);
        }
      });
      markersRef.current = [];
    };
  }, [city, points]);

  // Если Leaflet не загружен
  if (!L) {
    return (
      <section className={`${className} map`} style={{
        height: '500px',
        backgroundColor: '#2c3e50',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
          Карта OpenStreetMap
        </div>
        <div style={{ fontSize: '14px' }}>
          Используется Leaflet через CDN
        </div>
        <div style={{ 
          fontSize: '12px', 
          marginTop: '20px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '10px',
          borderRadius: '4px'
        }}>
          Координаты: {city.location.latitude.toFixed(4)}, {city.location.longitude.toFixed(4)}
          <br />
          Объектов: {points.length}
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={mapRef} 
      className={`${className} map`} 
      style={{ 
        height: '500px', 
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
}

export { Map };