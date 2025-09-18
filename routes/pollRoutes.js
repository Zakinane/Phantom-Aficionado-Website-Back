const express = require("express");
const router = express.Router();
const { getCurrentPoll, votePoll } = require("../controllers/pollController");

router.get("/current", getCurrentPoll);
router.post("/vote", votePoll);

module.exports = router;
