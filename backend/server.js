const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Database
const db = new Database("./pinterest.db");

console.log("SQLite database connected successfully");

// Create pins table
db.prepare(
  "CREATE TABLE IF NOT EXISTS pins (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "title TEXT NOT NULL, " +
    "description TEXT, " +
    "category TEXT, " +
    "image TEXT, " +
    "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
    ")"
).run();

console.log("Pins table ready");

// --------------------------------------------------
// ADD SAMPLE PINS
// --------------------------------------------------

const pinCount = db
  .prepare("SELECT COUNT(*) AS count FROM pins")
  .get();

if (pinCount.count === 1) {
  const insertPin = db.prepare(`
    INSERT INTO pins (title, description, category, image)
    VALUES (?, ?, ?, ?)
  `);

  insertPin.run(
    "Beautiful Fashion",
    "Fashion inspiration and outfit ideas",
    "Fashion",
    "/src/assets/fashion.jpg"
  );

  insertPin.run(
    "Delicious Food",
    "Food ideas and tasty recipes",
    "Food",
    "/src/assets/food.jpg"
  );

  insertPin.run(
    "Beautiful Nature",
    "Peaceful nature and landscape inspiration",
    "Nature",
    "/src/assets/nature.jpg"
  );

  insertPin.run(
    "Sunny Beach",
    "Relaxing beach and travel inspiration",
    "Travel",
    "/src/assets/beach.jpg"
  );

  insertPin.run(
    "Creative Ideas",
    "Creative art and design inspiration",
    "Art",
    "/src/assets/hero.png"
  );

  console.log("Sample pins added successfully");
}

// --------------------------------------------------
// TEST ROUTE
// --------------------------------------------------

app.get("/test", (req, res) => {
  res.json({
    message: "Backend is working"
  });
});

// --------------------------------------------------
// GET ALL PINS
// --------------------------------------------------

app.get("/api/pins", (req, res) => {
  try {
    const pins = db
      .prepare("SELECT * FROM pins ORDER BY id DESC")
      .all();

    res.json(pins);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get pins"
    });
  }
});

// --------------------------------------------------
// GET ONE PIN
// --------------------------------------------------

app.get("/api/pins/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const pin = db
      .prepare("SELECT * FROM pins WHERE id = ?")
      .get(id);

    if (!pin) {
      return res.status(404).json({
        message: "Pin not found"
      });
    }

    res.json(pin);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get pin"
    });
  }
});

// --------------------------------------------------
// CREATE NEW PIN
// --------------------------------------------------

app.post("/api/pins", (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description || "";
    const category = req.body.category || "";
    const image = req.body.image || "";

    // Title is required
    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const result = db
      .prepare(
        `
        INSERT INTO pins
        (title, description, category, image)
        VALUES (?, ?, ?, ?)
        `
      )
      .run(
        title,
        description,
        category,
        image
      );

    const newPin = db
      .prepare("SELECT * FROM pins WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(newPin);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create pin"
    });
  }
});

// --------------------------------------------------
// UPDATE PIN
// --------------------------------------------------

app.put("/api/pins/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const title = req.body.title;
    const description = req.body.description || "";
    const category = req.body.category || "";
    const image = req.body.image || "";

    const result = db
      .prepare(
        `
        UPDATE pins
        SET
          title = ?,
          description = ?,
          category = ?,
          image = ?
        WHERE id = ?
        `
      )
      .run(
        title,
        description,
        category,
        image,
        id
      );

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Pin not found"
      });
    }

    const updatedPin = db
      .prepare("SELECT * FROM pins WHERE id = ?")
      .get(id);

    res.json(updatedPin);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update pin"
    });
  }
});

// --------------------------------------------------
// DELETE PIN
// --------------------------------------------------

app.delete("/api/pins/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = db
      .prepare("DELETE FROM pins WHERE id = ?")
      .run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Pin not found"
      });
    }

    res.json({
      message: "Pin deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete pin"
    });
  }
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(
    "Server running on http://localhost:" + PORT
  );
});