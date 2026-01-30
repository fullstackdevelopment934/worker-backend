const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,

    password: String,

    trustScore: { type: Number, default: 0 },
    policeVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// 👇 IMPORTANT: use existing collection
module.exports = mongoose.model("Worker", workerSchema, "workers");
