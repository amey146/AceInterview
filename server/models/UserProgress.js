import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: String,
  level: String,
  score: Number,
  feedback: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("UserProgress", progressSchema);
