const express = require("express");
const emailController = require("../controllers/emailController");

const router = express.Router();

router.post("/send", emailController.send);
router.post("/broadcast", emailController.broadcastEmail);

module.exports = router;
