import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
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

let center = {
  lat: 8.757509273522448, // Latitude (e.g., London)
  lng: 76.74224853515626, // Longitude
};

function Map({ setFormData, mode, formData, editMarkerData }) {
  const [positions, setPositions] = useState(null);
  const[isIniatialCall,setIsinitialCall]= useState(false)

  useEffect(() => {
    if (mode === "edit" && editMarkerData.positions) {
      setPositions(editMarkerData.positions);
      setIsinitialCall(true)
    }
  }, [editMarkerData, mode]);

  const customIcon = new Icon({
    iconUrl: require("../../Asset/marker.png"),
    iconSize: [38, 38],
  });

  function MapClick() {
    const map = useMapEvent({
      click(e) {
        setPositions(e.latlng);
        map.flyTo(e.latlng);
      },
    });
    if (mode === "edit" && isIniatialCall) {
      map.flyTo(editMarkerData.positions);
      setIsinitialCall(false);
    }
    return positions === null ? null : (
      <Marker position={positions} icon={customIcon}>
        <Popup>
          <Form
            setFormData={setFormData}
            positions={positions}
            mark={editMarkerData}
            mode={mode}
            formData={formData}
          />
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
        {(mode === "add" || mode === "edit") && <MapClick />}
        {mode === "view" && (
          <>
            {formData.map((mark, i) => (
              <Marker key={i} position={mark.positions} icon={customIcon}>
                <Popup>
                  <Form setFormData={setFormData} mark={mark} mode={mode} />
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
