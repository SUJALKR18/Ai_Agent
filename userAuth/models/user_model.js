const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 5 characters long"],
    maxLength: [50, "Email must be at most 50 characters long"],
  },
  password: {
    type: String,
    select: false,
  },
});

userSchema.statics.hashPssword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = mongoose.model("user", userSchema);
