import React, { useState } from "react";
import { usePins } from "../PinContext";
import "./Home.css";

function Home() {
  const {
    pins,
    likedPins,
    savedPins,
    toggleLike,
    toggleSave,
  } = usePins();

  // Search text
  const [search, setSearch] = useState("");

  // Search button state
  const [searchText, setSearchText] = useState("");

  // Default pins
  const defaultPins = [
    {
      id: 1,
      title: "Beautiful Nature",
      description: "Explore the beauty of nature.",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
      link: "",
    },

    {
      id: 2,
      title: "Modern Interior",
      description: "Beautiful modern interior design ideas.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      link: "",
    },

    {
      id: 3,
      title: "Coffee Time",
      description: "A perfect cup of coffee to start your day.",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      link: "",
    },

    {
      id: 4,
      title: "Creative Workspace",
      description: "Create an inspiring workspace.",
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80",
      link: "",
    },

    {
      id: 5,
      title: "Travel Inspiration",
      description: "Beautiful places to explore.",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
      link: "",
    },

    {
      id: 6,
      title: "Fashion Ideas",
      description: "Latest fashion inspiration.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
      link: "",
    },
  ];

  // Combine newly created pins + default pins
  const allPins = [...pins, ...defaultPins];

  // Search function
  const handleSearch = () => {
    setSearchText(search.trim());
  };

  // Allow Enter key to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Filter pins
  const filteredPins = allPins.filter((pin) => {
    const text = searchText.toLowerCase();

    if (!text) {
      return true;
    }

    return (
      pin.title.toLowerCase().includes(text) ||
      pin.description.toLowerCase().includes(text)
    );
  });

  return (
    <div className="home-page">
      <div className="home-container">

        {/* PAGE TITLE */}
        <h1>Explore Ideas</h1>

        <p className="home-subtitle">
          Discover ideas and create your own Pins
        </p>

        {/* SEARCH BAR */}
        <div className="home-search">

          <input
            type="text"
            placeholder="Search for pins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSearch}>
            🔍 Search
          </button>

        </div>

        {/* SEARCH RESULT MESSAGE */}
        {searchText && (
          <div className="search-result">
            Search results for: <strong>{searchText}</strong>
          </div>
        )}

        {/* NO RESULTS */}
        {filteredPins.length === 0 ? (
          <div className="no-results">
            <h2>No Pins Found 😕</h2>

            <p>
              Try searching for another keyword.
            </p>
          </div>
        ) : (

          /* PIN GRID */
          <div className="pin-grid">

            {filteredPins.map((pin) => {

              const isLiked = likedPins.some(
                (item) => item.id === pin.id
              );

              const isSaved = savedPins.some(
                (item) => item.id === pin.id
              );

              return (
                <div
                  className="pin-card"
                  key={pin.id}
                >

                  {/* IMAGE */}
                  <div className="pin-image-container">

                    <img
                      src={pin.image}
                      alt={pin.title}
                      className="pin-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/500x600?text=Image+Not+Available";
                      }}
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="pin-content">

                    <h3>{pin.title}</h3>

                    <p>{pin.description}</p>

                    {/* ACTION BUTTONS */}
                    <div className="pin-actions">

                      {/* LIKE */}
                      <button
                        className={
                          isLiked
                            ? "action-button liked"
                            : "action-button"
                        }
                        onClick={() => toggleLike(pin)}
                      >
                        {isLiked
                          ? "❤️ Liked"
                          : "♡ Like"}
                      </button>

                      {/* SAVE */}
                      <button
                        className={
                          isSaved
                            ? "action-button saved"
                            : "action-button"
                        }
                        onClick={() => toggleSave(pin)}
                      >
                        {isSaved
                          ? "📌 Saved"
                          : "📌 Save"}
                      </button>

                    </div>

                    {/* WEBSITE LINK */}
                    {pin.link && (
                      <a
                        href={pin.link}
                        target="_blank"
                        rel="noreferrer"
                        className="pin-link"
                      >
                        Visit Website →
                      </a>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}

export default Home;