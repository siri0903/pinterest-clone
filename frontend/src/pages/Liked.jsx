import React from "react";
import PinGrid from "../components/PinGrid";
import { usePins } from "../PinContext";

function Liked() {
  const { likedPins } = usePins();

  return (
    <div className="liked-page">

      <h1>Liked Pins ❤️</h1>

      {likedPins.length === 0 ? (
        <p>You haven't liked any pins yet.</p>
      ) : (
        <PinGrid pins={likedPins} />
      )}

    </div>
  );
}

export default Liked;