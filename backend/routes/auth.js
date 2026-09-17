const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

// ---- mailer setup (used only by /send-otp) ----
let transporter;
async function getTransporter() {
  if (transporter) return transporter;
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  return transporter;
}

// ---------------- SIGNUP ----------------
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Account created', userId: user._id });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// ---------------- SIGNIN ----------------
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token, name: user.name, email: user.email });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// ---------------- SEND OTP (forgot password step 1) ----------------
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'No account found with this email' });
    }

    // 6-digit numeric OTP, valid for 10 minutes
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const t = await getTransporter();
    const info = await t.sendMail({
      from: '"SyncSpace" <noreply@syncspace.com>',
      to: user.email,
      subject: 'Your SyncSpace password reset code',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`,
    });

    console.log('\n=============================');
    console.log(`OTP for ${user.email}: ${otp}`);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    console.log('=============================\n');

    return res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Send OTP error:', err);
    return res.status(500).json({ message: 'Could not send OTP. Please try again.' });
  }
});

// ---------------- RESET PASSWORD (forgot password step 2) ----------------
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.otp || !user.otpExpires) {
      return res.status(400).json({ message: 'Please request a new OTP' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Incorrect OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;