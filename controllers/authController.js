const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/emailService");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Already used");
    }

    const user = new User({
      email,
      password,
    });
    await user.save();
    const result = await sendEmail(
      email,
      "Welcome to the Phan-Site !",
      "Well, cool"
    );
    console.log(result);
    console.log("User created successfully !:", user.email);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).send("Error : " + err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send("Incorrect Email or Password.");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).send("Error : " + err.message);
  }
};
