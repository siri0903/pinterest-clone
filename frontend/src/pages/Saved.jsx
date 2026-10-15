import React from "react";
import PinGrid from "../components/PinGrid";
import { usePins } from "../PinContext";

function Saved() {
  const { savedPins } = usePins();

  return (
    <div style={{ padding: "30px" }}>
      <h1>Saved Pins 📌</h1>

      {savedPins.length === 0 ? (
        <p>You haven't saved any pins yet.</p>
      ) : (
        <PinGrid pins={savedPins} />
      )}
    </div>
  );
}

export default Saved;