import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile({ pins = [] }) {
  const navigate = useNavigate();

  const [name, setName] = useState(
    localStorage.getItem("profileName") ||
      "Pinterest User"
  );

  const [bio, setBio] = useState(
    localStorage.getItem("profileBio") ||
      "Creating beautiful ideas ✨"
  );

  const [isEditing, setIsEditing] =
    useState(false);

  const [editName, setEditName] =
    useState(name);

  const [editBio, setEditBio] =
    useState(bio);

  // Save profile
  const saveProfile = () => {
    const newName =
      editName.trim() || "Pinterest User";

    const newBio =
      editBio.trim() ||
      "Creating beautiful ideas ✨";

    setName(newName);
    setBio(newBio);

    localStorage.setItem(
      "profileName",
      newName
    );

    localStorage.setItem(
      "profileBio",
      newBio
    );

    setIsEditing(false);
  };

  return (
    <div className="profile-page">

      {/* Profile Header */}
      <div className="profile-header">

        {/* Profile Picture */}
        <div className="profile-picture">
          {name.charAt(0).toUpperCase()}
        </div>

        {!isEditing ? (
          <>
            <h1>{name}</h1>

            <p className="profile-bio">
              {bio}
            </p>

            <p className="profile-count">
              {pins.length}{" "}
              {pins.length === 1
                ? "Pin"
                : "Pins"}
            </p>

            <button
              className="edit-profile-button"
              onClick={() =>
                setIsEditing(true)
              }
            >
              ✏️ Edit Profile
            </button>
          </>
        ) : (
          <div className="profile-edit-form">

            <input
              type="text"
              placeholder="Your name"
              value={editName}
              onChange={(event) =>
                setEditName(
                  event.target.value
                )
              }
            />

            <textarea
              placeholder="Your bio"
              value={editBio}
              onChange={(event) =>
                setEditBio(
                  event.target.value
                )
              }
            />

            <div className="profile-edit-buttons">

              <button
                className="save-profile-button"
                onClick={saveProfile}
              >
                💾 Save
              </button>

              <button
                className="cancel-profile-button"
                onClick={() => {
                  setEditName(name);
                  setEditBio(bio);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        )}

      </div>


      {/* Created Pins */}
      <div className="profile-pins-section">

        <h2>
          Your Pins
        </h2>

        {pins.length > 0 ? (

          <div className="profile-pin-grid">

            {pins.map((pin) => (

              <div
                className="profile-pin-card"
                key={pin.id}
                onClick={() =>
                  navigate(`/pin/${pin.id}`)
                }
              >

                <img
                  src={pin.image}
                  alt={pin.title}
                />

                <h3>
                  {pin.title}
                </h3>

                <p>
                  {pin.category}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <div className="no-profile-pins">

            <div className="empty-profile-icon">
              📌
            </div>

            <h3>
              You don't have any Pins yet
            </h3>

            <p>
              Create your first Pin to
              get started.
            </p>

            <button
              onClick={() =>
                navigate("/create")
              }
            >
              + Create Pin
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Profile;