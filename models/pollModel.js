const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  startDate: { type: Date, default: Date.now },  // début du poll
  endDate: { type: Date, required: true },       // fin du poll (1 semaine)
  totalVotes: { type: Number, default: 0 },
  votesCount: { yes: { type: Number, default: 0 }, no: { type: Number, default: 0 } }
});

module.exports = mongoose.model("Poll", pollSchema);
