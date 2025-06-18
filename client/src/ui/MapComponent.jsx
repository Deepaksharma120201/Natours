import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Tooltip,
} from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { renderToString } from "react-dom/server";

// Helper component to fit map to bounds
function FitBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const leafletBounds = L.latLngBounds(
      locations.map((loc) => [loc.coordinates[1], loc.coordinates[0]])
    );

    map.fitBounds(leafletBounds, {
      padding: [75, 75],
    });
  }, [locations, map]);

  return null;
}

export const MapComponent = ({ locations }) => {
  const createReactIcon = () => {
    return L.divIcon({
      html: renderToString(<FaMapMarkerAlt color="#55c57a" size="25" />),
      className: "leaflet-react-icon",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -35],
    });
  };

  return (
    <MapContainer
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      className="map-container"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc) => (
        <Marker
          key={loc._id}
          position={[loc.coordinates[1], loc.coordinates[0]]}
          icon={createReactIcon()}
        >
          <Tooltip
            permanent
            direction="right"
            offset={[5, -15]}
            className="permanent-tooltip"
          >
            {`Day ${loc.day}: ${loc.description}`}
          </Tooltip>
        </Marker>
      ))}

      <FitBounds locations={locations} />
    </MapContainer>
  );
};
