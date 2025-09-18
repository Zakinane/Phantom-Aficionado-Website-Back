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
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL, 
];
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
