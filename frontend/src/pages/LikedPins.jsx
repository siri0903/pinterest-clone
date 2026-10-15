import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LikedPins.css";

function LikedPins({ pins = [] }) {
  const navigate = useNavigate();

  const [likedPins, setLikedPins] = useState([]);

  // Load liked pins
  useEffect(() => {
    try {
      const savedLikes =
        localStorage.getItem("likedPins");

      if (savedLikes) {
        setLikedPins(
          JSON.parse(savedLikes)
        );
      }
    } catch (error) {
      console.error(
        "Error loading liked pins:",
        error
      );
    }
  }, []);

  // Get actual pin objects
  const likedPinObjects = pins.filter(
    (pin) =>
      likedPins.includes(pin.id)
  );

  // Unlike a pin
  const handleUnlike = (event, pinId) => {
    event.stopPropagation();

    const updatedLikes =
      likedPins.filter(
        (id) => id !== pinId
      );

    setLikedPins(updatedLikes);

    localStorage.setItem(
      "likedPins",
      JSON.stringify(updatedLikes)
    );
  };

  return (
    <div className="liked-page">

      {/* Header */}
      <div className="liked-header">

        <h1>
          ❤️ Liked Pins
        </h1>

        <p>
          {likedPinObjects.length}{" "}
          {likedPinObjects.length === 1
            ? "Pin"
            : "Pins"}{" "}
          you liked
        </p>

      </div>


      {/* Pins */}
      {likedPinObjects.length > 0 ? (

        <div className="liked-grid">

          {likedPinObjects.map((pin) => (

            <div
              className="liked-card"
              key={pin.id}
              onClick={() =>
                navigate(
                  `/pin/${pin.id}`
                )
              }
            >

              {/* Image */}
              <div className="liked-image-container">

                <img
                  src={pin.image}
                  alt={pin.title}
                />

                {/* Unlike button */}
                <button
                  className="unlike-button"
                  onClick={(event) =>
                    handleUnlike(
                      event,
                      pin.id
                    )
                  }
                >
                  ❤️ Liked
                </button>

              </div>


              {/* Title */}
              <h3>
                {pin.title}
              </h3>


              {/* Category */}
              <p>
                {pin.category}
              </p>

            </div>

          ))}

        </div>

      ) : (

        /* Empty state */
        <div className="empty-liked">

          <div className="empty-liked-icon">
            ❤️
          </div>

          <h2>
            No liked pins yet
          </h2>

          <p>
            Like some pins and they'll
            appear here.
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
          >
            Explore Pins
          </button>

        </div>

      )}

    </div>
  );
}

export default LikedPins;