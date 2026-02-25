const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const PhysioBooking = require("./models/PhysioBooking");
const bcrypt = require("bcrypt");




const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/reference", express.static("reference_videos"));


/* ===== MongoDB Connection ===== */
mongoose.connect("mongodb://127.0.0.1:27017/gaitdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ===== Schema ===== */
const uploadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
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
        const videos = await Upload.find({ userId: req.query.userId }).sort({ uploadedAt: -1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/progress", async (req, res) => {
  try {
    const { start, end } = req.query;

    const videos = await Upload.find({
        userId: req.query.userId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    res.json(videos);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

app.post("/upload", uploadMiddleware, async (req, res) => {
  try {

    const { userId, date } = req.body;
    const videoPath = req.file.path;

    const form = new FormData();
    form.append("video", fs.createReadStream(videoPath));

    const aiResponse = await axios.post(
      "http://localhost:8000/analyze",
      form,
      { headers: form.getHeaders() }
    );

    const gaitMetrics = aiResponse.data;

    const newUpload = new Upload({
      userId,
      date,
      videoPath,
      gaitMetrics
    });

    await newUpload.save();

    res.json({
      message: "Video analyzed successfully!",
      gaitMetrics
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



app.post("/book-physio", async (req, res) => {
  try {
    const booking = new PhysioBooking(req.body);
    await booking.save();

    res.json({ message: "Appointment booked successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const User = require("./models/User");

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });
  if (!user) return res.json({ success: false });

  const bcrypt = require("bcrypt");
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.json({ success: false });

  res.json({
    success: true,
    userId: user._id,
    role: user.role,
    name: user.name
  });
});




app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.json({ success: true, message: "Registration successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




/* ===== Start Server ===== */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
