const jwt = require("jsonwebtoken");
const Poll = require("../models/pollModel");
const PollVote = require("../models/pollVoteModel");

// GET /poll/current
exports.getCurrentPoll = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token invalide" });
    }

    const now = new Date();
    const poll = await Poll.findOne({
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    if (!poll) return res.status(404).json({ message: "Aucun poll actif" });

    // Vérifier si l'utilisateur a déjà voté
    const vote = await PollVote.findOne({
      pollId: poll._id,
      userId: decoded.id,
    });
    const userVote = vote ? vote.choice : null;

    // Calcul pourcentage (50% par défaut si pas de vote)
    const totalVotes = poll.totalVotes || 0;
    const yesVotes = poll.votesCount?.yes || 0;
    const percentage = totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 50;

    res.json({ ...poll.toObject(), userVote, percentage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /poll/vote
exports.votePoll = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token invalide" });
    }

    const { pollId, choice } = req.body;
    const userId = decoded.id;

    // Vérifier vote 24h
    const lastVote = await PollVote.findOne({ pollId, userId }).sort({
      createdAt: -1,
    });
    if (lastVote && Date.now() - lastVote.createdAt < 24 * 60 * 60 * 1000) {
      return res.status(403).json({ message: "Vote déjà soumis dans les dernières 24h" });
    }

    // Enregistrer le vote
    const vote = new PollVote({ pollId, userId, choice });
    await vote.save();

    // Mise à jour stats
    const update =
      choice === "yes"
        ? { $inc: { totalVotes: 1, "votesCount.yes": 1 } }
        : { $inc: { totalVotes: 1, "votesCount.no": 1 } };
    const poll = await Poll.findByIdAndUpdate(pollId, update, { new: true });

    const totalVotes = poll.totalVotes || 0;
    const yesVotes = poll.votesCount?.yes || 0;
    const percentage = totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 50;

    res.json({ message: "Vote enregistré", percentage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
