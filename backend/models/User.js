const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // stored as a bcrypt hash, never plain text

  // used only during the forgot-password flow
  otp: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);