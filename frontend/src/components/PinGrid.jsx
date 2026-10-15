import React from "react";
import PinCard from "./PinCard";
import "./PinGrid.css";

function PinGrid({ pins }) {
  if (!pins || pins.length === 0) {
    return <p className="no-pins">No pins found 😳</p>;
  }

  return (
    <div className="pin-grid">
      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  );
}

export default PinGrid;