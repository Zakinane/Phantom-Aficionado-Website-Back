const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // minimum 6 caractères
  },
  role: {
    type: String,
    enum: ["user", "moderator", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar/?d=mp",
  },
  bio: {
    type: String,
    maxlength: 200,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

// Username Generator
const adjectives = ["Cool", "Dark", "Mystic", "Red", "Silent", "Black"];
const phantoms = [
  "Joker",
  "Mona",
  "Skull",
  "Panther",
  "Fox",
  "Queen",
  "Oracle",
  "Noir",
  "Crow",
  "Violet",
];

// Générer un username si absent (avant validation)
userSchema.pre("validate", function (next) {
  if (!this.username) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const phantom = phantoms[Math.floor(Math.random() * phantoms.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 chiffres aléatoires
    this.username = `${adj}${phantom}_${randomNum}`;
  }
  next();
});

// Hash du password si modifié
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Comparer password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
