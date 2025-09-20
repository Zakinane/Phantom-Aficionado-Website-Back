const express = require("express");
const router = express.Router();
const { createTopic } = require("../controllers/topicController");

router.post("/", createTopic);

module.exports = router;
