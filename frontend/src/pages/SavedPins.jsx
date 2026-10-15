import { useEffect, useState } from "react";
import "./SavedPins.css";

function SavedPins({ pins }) {
  const [savedPins, setSavedPins] = useState([]);

  // Load saved pin IDs
  useEffect(() => {
    const saved = localStorage.getItem("savedPins");

    if (saved) {
      setSavedPins(JSON.parse(saved));
    }
  }, []);

  // Only show saved pins
  const savedPinObjects = pins.filter((pin) =>
    savedPins.includes(pin.id)
  );

  return (
    <div className="saved-page">

      <h1>Saved Pins</h1>

      {savedPinObjects.length > 0 ? (
        <div className="saved-grid">

          {savedPinObjects.map((pin) => (
            <div
              className="saved-card"
              key={pin.id}
            >

              <img
                src={pin.image}
                alt={pin.title}
              />

              <h3>{pin.title}</h3>

              <p>{pin.category}</p>

            </div>
          ))}

        </div>
      ) : (
        <div className="empty-saved">

          <div className="empty-icon">
            📌
          </div>

          <h2>No saved pins yet</h2>

          <p>
            Click the Save button on a pin
            to see it here.
          </p>

        </div>
      )}

    </div>
  );
}

export default SavedPins;