const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

// Initialize Express app
const app = express();
const port = 5000;

// Middleware to handle CORS (for cross-origin requests from the frontend)
app.use(cors());

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename with timestamp
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Correcting fileSize limit

// Create a POST endpoint to handle image uploads
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Received request body:", req.body); // Log the body of the request
  console.log("Received file:", req.file); // Log the uploaded file

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.json({
    message: "File uploaded successfully!",
    filePath: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
