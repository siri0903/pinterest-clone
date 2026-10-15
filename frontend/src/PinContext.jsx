import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PinContext = createContext();

const API_URL = "https://pinterest-clone-kn38.onrender.com";

export function PinProvider({ children }) {
  // All pins
  const [pins, setPins] = useState([]);

  // Liked pins
  const [likedPins, setLikedPins] = useState([]);

  // Saved pins
  const [savedPins, setSavedPins] = useState([]);

  // Load pins from the online backend
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch(`${API_URL}/api/pins`);

        if (!response.ok) {
          throw new Error("Failed to load pins");
        }

        const data = await response.json();
        setPins(data);
      } catch (error) {
        console.error("Error loading pins:", error);
      }
    };

    fetchPins();
  }, []);

  // Add a new pin to the online database
  const addPin = async (pin) => {
    try {
      const response = await fetch(`${API_URL}/api/pins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pin),
      });

      if (!response.ok) {
        throw new Error("Failed to create pin");
      }

      const newPin = await response.json();

      setPins((currentPins) => [newPin, ...currentPins]);

      return newPin;
    } catch (error) {
      console.error("Error adding pin:", error);
      alert("Could not add pin. Please try again.");
      throw error;
    }
  };

  // Like / unlike pin
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

  // Save / unsave pin
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

export function usePins() {
  return useContext(PinContext);
}