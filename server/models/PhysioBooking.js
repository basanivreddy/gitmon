const mongoose = require("mongoose");

const physioSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: String,
  age: Number,
  gender: String,
  problem: String,
  painLevel: Number,
  previousInjury: String,
  preferredDate: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("PhysioBooking", physioSchema);
