import React from "react";
import "./style.css";
import Map from "../Map";

const Popup = ({ setIsOpen, setFormData, formData, mode, editMarkerData }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <Map
          setFormData={setFormData}
          formData={formData}
          mode={mode}
          editMarkerData={editMarkerData}
        />
        <div className="button-center-container">
          <button
            className="button-close"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
