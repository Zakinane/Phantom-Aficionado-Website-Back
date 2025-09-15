const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/', authRoutes); 
app.use('/', emailRoutes); 

// Erreur 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Page on port : ${PORT}`);
});