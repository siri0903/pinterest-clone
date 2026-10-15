import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-container">
      <div className="search-box">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search for ideas"
        />

        <button className="search-button">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;