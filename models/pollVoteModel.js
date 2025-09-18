const mongoose = require("mongoose");

const pollVoteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
  userId: { type: String, required: true },
  choice: { type: String, enum: ["yes", "no"], required: true },
  createdAt: { type: Date, default: Date.now }
});

// Index unique pour éviter que l'utilisateur vote plusieurs fois pour le même poll
pollVoteSchema.index({ pollId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("PollVote", pollVoteSchema);
