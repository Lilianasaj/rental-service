import { useEffect, useRef } from 'react';
import L, { Icon, LayerGroup, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CityOffer, OfferLocation } from '../../types/offer';

type LeafletDefaultIconPrototype = typeof L.Icon.Default.prototype & {
  _getIconUrl?: string;
};

delete (L.Icon.Default.prototype as LeafletDefaultIconPrototype)._getIconUrl;

const defaultIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapPoint = {
  id: string;
  location: OfferLocation;
};

type MapProps = {
  city: CityOffer;
  points: MapPoint[];
  className: string;
  selectedPoint?: MapPoint;
};

function Map({ city, points, className, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);

  const { latitude, longitude, zoom } = city.location;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) {
      return;
    }

    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, [latitude, longitude, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;

    if (!map || !markersLayer) {
      return;
    }

    map.setView([latitude, longitude], zoom);
    markersLayer.clearLayers();

    points.forEach((point) => {
      L.marker([point.location.latitude, point.location.longitude], {
        icon: point.id === selectedPoint?.id ? activeIcon : defaultIcon,
      }).addTo(markersLayer);
    });
  }, [latitude, longitude, zoom, points, selectedPoint]);

  return <section className={`${className} map`} ref={mapRef}></section>;
}

export { Map };
