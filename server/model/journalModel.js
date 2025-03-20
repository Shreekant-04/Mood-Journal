const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "neutral"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const JournalEntry = mongoose.model("JournalEntry", Schema);
module.exports = JournalEntry;
