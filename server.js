const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const pollRoutes = require("./routes/pollRoutes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// askip usefull
const allowedOrigin = process.env.FRONTEND_URL;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Si dev local ou pas d'origine (postman, axios depuis serveur), accepter
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // pour cookies / headers d'auth
  })
);

// Connexion à MongoDB
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", emailRoutes);
app.use("/poll", pollRoutes);

// Erreur 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Page on port : ${PORT}`);
});
