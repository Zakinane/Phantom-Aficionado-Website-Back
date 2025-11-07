const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationDate: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  isClosed: { type: Boolean, default: false },
  closedAt: {
    type: Date,
    default: null,
  },
  nbrPosts: { type: Number, default: 1 },
  nbrPosters: { type: Number, default: 1 },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tags: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Topic", topicSchema);
