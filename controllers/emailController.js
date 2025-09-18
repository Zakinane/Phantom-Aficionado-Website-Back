const { sendEmail } = require("../services/emailService");
const User = require("../models/userModel");
const { WelcomeLetter } = require("./templates/emailTemplates");

exports.send = async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    await sendEmail(email, subject, "", content);
    return res.status(201).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur : " + error.message });
  }
};

exports.broadcastEmail = async (req, res) => {
  try {
    const { subject, content } = req.body;

    const users = await User.find({}, "email");
    if (!users.length) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé." });
    }

    const results = [];
    for (const user of users) {
      try {
        await sendEmail(
          user.email,
          subject || "Message du Phan-Site",
          "",
          content || WelcomeLetter(user.email)
        );
        results.push({ email: user.email, status: "Envoyé" });
      } catch (err) {
        results.push({ email: user.email, status: "Erreur", error: err.message });
      }
    }

    return res.status(200).json({
      message: "Broadcast terminé",
      results,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur : " + error.message });
  }
};
