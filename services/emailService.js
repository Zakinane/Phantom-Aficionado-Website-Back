const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: `"Phan-Site\'s Bot" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };
  try {
    await transporter.sendMail(mailOptions);
    return 'Email envoyé avec succès !';
  } catch (err) {
    throw new Error('Error while sending : ' + err.message);
  }
};

module.exports = { sendEmail };