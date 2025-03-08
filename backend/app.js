const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json()); // To handle raw JSON bodies

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamically choose folder based on the route
    if (req.originalUrl.includes("damage_detection")) {
      cb(null, "uploads/damages"); // Save to uploads/damages
    } else if (req.originalUrl.includes("tire_quality")) {
      cb(null, "uploads/tires"); // Save to uploads/tires
    } else if (req.originalUrl.includes("market_prediction")) {
      cb(null, "uploads/cars"); // Save to uploads/tires
    } else {
      cb(new Error("Invalid route"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add timestamp to avoid conflicts
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB file size limit

//******************************************************* */ 1. Route for /damage_detection/upload to save images in /uploads/damages
app.post("/damage_detection/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  // Send response with the path of the uploaded file
  res.json({
    message: "File uploaded successfully!",
    filePath: `http://localhost:5000/uploads/damages/${req.file.filename}`,
  });
});

//********************************************************* */ 2. Route for /tires/upload to save images in /uploads/tires
app.post("/tire_quality/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  // Send response with the path of the uploaded file
  res.json({
    message: "File uploaded successfully!",
    filePath: `http://localhost:5000/uploads/tires/${req.file.filename}`,
  });
});

//********************************************************* */ 3. Route for /market_prediction/upload to save images in /uploads/cars
app.post("/market_prediction/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  // Send response with the path of the uploaded file
  res.json({
    message: "File uploaded successfully!",
    filePath: `http://localhost:5000/uploads/cars/${req.file.filename}`,
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Backend server is running on http://localhost:5000");
});
