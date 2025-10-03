const Topic = require("../models/topicModel");
const jwt = require("jsonwebtoken");

exports.createTopic = async (req, res) => {
  try {
    const { title, description, tags, category } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Récupérer le token depuis les headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    // Décoder le token pour obtenir l'ID de l'utilisateur
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Token invalid" });
    }

    const creator = decoded.id;

    const newTopic = new Topic({
      title,
      description,
      tags,
      category,
      creator,
      participants: [creator],
    });

    await newTopic.save();

    res.status(201).json(newTopic);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.title) {
      return res.status(400).json({ error: "Topic title already exists" });
    }

    res.status(500).json({ error: err.message });
  }
};

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("creator", "username")
      .populate("category", "name");

    res.status(200).json(topics);
  } catch (err) {
    console.error("Get topics error:", err);
    res.status(500).json({ error: err.message });
  }
};
