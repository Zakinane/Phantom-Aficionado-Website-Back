const { sendEmail } = require("../services/emailService");

exports.send = async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    await sendEmail(email, subject, content);
    return res.status(201).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur : " + error.message });
  }
};
