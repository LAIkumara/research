const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json()); // To handle raw JSON bodies

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.body.image && !req.file) {
    return res.status(400).send("No file uploaded");
  }

  // If image data is in base64 (for web), save it as a file
  if (req.body.image) {
    const base64Data = req.body.image;
    const filePath = path.join(__dirname, "uploads", Date.now() + "-image.jpg");
    require("fs").writeFileSync(filePath, base64Data, "base64");
    res.json({
      message: "File uploaded successfully!",
      filePath: `http://localhost:5000/uploads/${path.basename(filePath)}`,
    });
  } else {
    // If file is uploaded, handle it normally
    res.json({
      message: "File uploaded successfully!",
      filePath: `http://localhost:5000/uploads/${req.file.filename}`,
    });
  }
});

app.listen(5000, () => {
  console.log("Backend server is running on http://localhost:5000");
});
