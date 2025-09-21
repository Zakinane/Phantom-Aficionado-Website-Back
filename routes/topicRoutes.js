const express = require("express");
const router = express.Router();
const { createTopic, getTopics } = require("../controllers/topicController");

router.post("/", createTopic);
router.get("/", getTopics);

module.exports = router;