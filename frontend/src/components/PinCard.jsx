import React from "react";
import "./PinCard.css";
import { usePins } from "../PinContext";

function PinCard({ pin }) {
  const {
    likedPins,
    savedPins,
    toggleLike,
    toggleSave,
  } = usePins();

  const liked = likedPins.some(
    (item) => item.id === pin.id
  );

  const saved = savedPins.some(
    (item) => item.id === pin.id
  );

  return (
    <div className="pin-card">

      <img
        src={pin.image}
        alt={pin.title}
        className="pin-image"
      />

      <div className="pin-content">

        <h3>{pin.title}</h3>

        <p>{pin.description}</p>

        <div className="pin-actions">

          <button
            onClick={() => toggleLike(pin)}
          >
            {liked ? "❤️ Liked" : "♡ Like"}
          </button>

          <button
            onClick={() => toggleSave(pin)}
          >
            {saved ? "✅ Saved" : "💾 Save"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default PinCard;