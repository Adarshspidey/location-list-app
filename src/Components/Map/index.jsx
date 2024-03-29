import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "../../index.css";
import { Icon } from "leaflet";
import Form from "../Form";

const center = {
  lat: 51.505, // Latitude (e.g., London)
  lng: -0.09, // Longitude
};

function Map({setFormData }) {
  const [positions, setPositions] = useState(null);

  const customIcon = new Icon({
    iconUrl: require("../../Asset/marker.png"),
    iconSize: [38, 38],
  });

  function MapClick() {
    const map = useMapEvent({
      click(e) {
        // alert(e.latlng);
        setPositions(e.latlng);
        map.flyTo(e.latlng);
      },
    });
    return positions === null ? null : (
      <Marker position={positions} icon={customIcon}>
        <Popup>
          <Form setFormData={setFormData} positions={positions}/>
        </Popup>
      </Marker>
    );
  }

  return (
    <div>
      <MapContainer center={center} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClick />
      </MapContainer>
    </div>
  );
}

export default Map;
