import React, { useState } from "react";
import "./CreatePin.css";

function CreatePin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPin = {
      id: Date.now(),
      title,
      description,
      image,
      link,
    };

    console.log("New Pin:", newPin);

    alert("Pin created successfully! 🎉");

    setTitle("");
    setDescription("");
    setImage("");
    setLink("");
  };

  return (
    <div className="create-pin-page">
      <div className="create-pin-container">

        <h1>Create Pin 📌</h1>

        <p className="create-subtitle">
          Create a new Pinterest pin
        </p>

        <form onSubmit={handleSubmit}>

          <label>Title *</label>
          <input
            type="text"
            placeholder="Add a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description *</label>
          <textarea
            placeholder="Tell everyone what your Pin is about..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Image URL *</label>
          <input
            type="text"
            placeholder="Paste image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Website Link</label>
          <input
            type="text"
            placeholder="Add a website link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <button type="submit">
            Create Pin
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreatePin;