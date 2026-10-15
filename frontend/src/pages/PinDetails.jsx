import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PinDetails.css";

function PinDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState("");


  // ==========================================
  // GET PIN FROM BACKEND
  // ==========================================

  useEffect(() => {
    fetchPin();
  }, [id]);


  const fetchPin = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/pins/${id}`
      );

      if (!response.ok) {
        throw new Error("Pin not found");
      }

      const data = await response.json();

      setPin(data);

      setTitle(data.title || "");
      setDescription(data.description || "");
      setCategory(data.category || "");

      setError("");
    } catch (error) {
      console.error("Error fetching pin:", error);

      setError("Unable to load this pin.");
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // UPDATE PIN
  // ==========================================

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/pins/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            title: title,
            description: description,
            category: category
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update pin.");
        return;
      }

      setPin(data.pin);

      setTitle(data.pin.title || "");
      setDescription(data.pin.description || "");
      setCategory(data.pin.category || "");

      setEditing(false);

      alert("Pin updated successfully! ✏️");
    } catch (error) {
      console.error("Update error:", error);

      alert(
        "Could not connect to the backend."
      );
    }
  };


  // ==========================================
  // DELETE PIN
  // ==========================================

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pin?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/pins/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete pin.");
        return;
      }

      alert("Pin deleted successfully! 🗑️");

      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        "Could not connect to the backend."
      );
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="pin-details-page">

        <div className="loading">
          <h2>Loading pin...</h2>
        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR / PIN NOT FOUND
  // ==========================================

  if (error || !pin) {
    return (
      <div className="pin-details-page">

        <div className="error-message">

          <h2>
            {error || "Pin not found"}
          </h2>

          <button
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>
    );
  }


  // ==========================================
  // PIN DETAILS PAGE
  // ==========================================

  return (
    <div className="pin-details-page">

      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>


      <div className="pin-details-container">

        {/* ================================= */}
        {/* IMAGE */}
        {/* ================================= */}

        <div className="pin-details-image">

          {pin.image ? (
            <img
              src={pin.image}
              alt={pin.title}
            />
          ) : (
            <div className="no-image">
              No image available
            </div>
          )}

        </div>


        {/* ================================= */}
        {/* DETAILS */}
        {/* ================================= */}

        <div className="pin-details-info">

          {!editing ? (

            <>
              <h1>
                {pin.title}
              </h1>


              {pin.description && (
                <p className="pin-description">
                  {pin.description}
                </p>
              )}


              {pin.category && (
                <span className="details-category">
                  {pin.category}
                </span>
              )}


              {/* ACTION BUTTONS */}

              <div className="pin-actions">

                <button
                  className="edit-button"
                  onClick={() => setEditing(true)}
                >
                  ✏️ Edit
                </button>


                <button
                  className="delete-button"
                  onClick={handleDelete}
                >
                  🗑️ Delete
                </button>

              </div>

            </>

          ) : (

            /* ================================= */
            /* EDIT FORM */
            /* ================================= */

            <form
              className="edit-form"
              onSubmit={handleUpdate}
            >

              <h2>
                Edit Pin
              </h2>


              {/* TITLE */}

              <label>
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Enter pin title"
              />


              {/* DESCRIPTION */}

              <label>
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Enter description"
                rows="5"
              />


              {/* CATEGORY */}

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >

                <option value="">
                  Select Category
                </option>

                <option value="Nature">
                  Nature
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Fashion">
                  Fashion
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="Art">
                  Art
                </option>

                <option value="Fitness">
                  Fitness
                </option>

              </select>


              {/* EDIT BUTTONS */}

              <div className="edit-actions">

                <button
                  type="submit"
                  className="save-button"
                >
                  💾 Save Changes
                </button>


                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setEditing(false);

                    setTitle(pin.title || "");
                    setDescription(
                      pin.description || ""
                    );
                    setCategory(
                      pin.category || ""
                    );
                  }}
                >
                  Cancel
                </button>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}

export default PinDetails;