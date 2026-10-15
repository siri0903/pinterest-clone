import React, { createContext, useContext, useState } from "react";

const PinContext = createContext();

export function PinProvider({ children }) {

  // All pins
  const [pins, setPins] = useState([]);

  // Liked pins
  const [likedPins, setLikedPins] = useState([]);

  // Saved pins
  const [savedPins, setSavedPins] = useState([]);


  // =========================
  // ADD NEW PIN
  // =========================

  const addPin = (pin) => {
    setPins((currentPins) => {
      return [pin, ...currentPins];
    });
  };


  // =========================
  // LIKE / UNLIKE PIN
  // =========================

  const toggleLike = (pin) => {

    setLikedPins((currentLikedPins) => {

      const alreadyLiked = currentLikedPins.some(
        (item) => item.id === pin.id
      );

      if (alreadyLiked) {

        return currentLikedPins.filter(
          (item) => item.id !== pin.id
        );

      }

      return [...currentLikedPins, pin];

    });

  };


  // =========================
  // SAVE / UNSAVE PIN
  // =========================

  const toggleSave = (pin) => {

    setSavedPins((currentSavedPins) => {

      const alreadySaved = currentSavedPins.some(
        (item) => item.id === pin.id
      );

      if (alreadySaved) {

        return currentSavedPins.filter(
          (item) => item.id !== pin.id
        );

      }

      return [...currentSavedPins, pin];

    });

  };


  return (
    <PinContext.Provider
      value={{
        pins,
        addPin,

        likedPins,
        savedPins,

        toggleLike,
        toggleSave,
      }}
    >
      {children}
    </PinContext.Provider>
  );
}


// Custom hook
export function usePins() {
  return useContext(PinContext);
}