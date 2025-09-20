const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/emailService");
const { WelcomeLetter } = require("../controllers/templates/emailTemplates");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si mot de passe a au moins 6 caractères côté serveur
    if (!password || password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already used");
    }

    const user = new User({ email, password });
    await user.save();

    await sendEmail(
      email,
      "Welcome to the Phan-Site !",
      "",
      WelcomeLetter(email)
    );

    console.log("User created successfully:", user.email);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, email: user.email, username: user.username });
  } catch (err) {
    console.error("Register error:", err);
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

    res.json({ token, email: user.email, username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Error : " + err.message);
  }
};
