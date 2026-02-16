const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ===== MongoDB Connection ===== */
mongoose.connect("mongodb://127.0.0.1:27017/gaitdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ===== Schema ===== */
const uploadSchema = new mongoose.Schema({
  date: String,
  videoPath: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Upload = mongoose.model("Upload", uploadSchema);

/* ===== Multer Setup ===== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.get("/videos", async (req, res) => {
  try {
    const videos = await Upload.find().sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ===== Upload API ===== */
app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const newUpload = new Upload({
      date: req.body.date,
      videoPath: req.file.path
    });

    await newUpload.save();
    res.json({ message: "Upload saved successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/upload", upload.single("video"), async (req, res) => {
  console.log("Upload request received");
  console.log("Date:", req.body.date);
  console.log("File:", req.file);

  try {
    const newUpload = new Upload({
      date: req.body.date,
      videoPath: req.file.path
    });

    await newUpload.save();
    res.json({ message: "Upload saved successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


/* ===== Start Server ===== */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
