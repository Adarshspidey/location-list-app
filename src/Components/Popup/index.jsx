import React from "react";
import "./style.css";
import Map from "../Map";

const Popup = ({ setIsOpen, setFormData }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <Map setFormData={setFormData} />
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close
        </button>
      </div>
      <div className="top-button-wrapper">
        
      </div>
    </div>
  );
};

export default Popup;
