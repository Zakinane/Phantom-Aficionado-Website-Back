const express = require("express");
const router = express.Router();
const Topic = require("../models/topicModel");
const { createTopic, getTopics } = require("../controllers/topicController");

router.post("/", createTopic);
router.get("/", getTopics);

router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate("creator", "username avatar")
      .populate("participants", "username avatar");
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
