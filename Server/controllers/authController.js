const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
const { JWT_SECRET } = require('../config');
const { generateToken } = require('../utils/jwtUtils');


const users = {};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // if (await User.findOne({ username })) {
  //   return res.status(400).json({ message: 'User already exists' });
  // }

  if (users[email]) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { username,email, password: hashedPassword }
  // const user = new User({ username,email, password: hashedPassword });
  // await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // const user = await User.findOne({ username });
  // if (!user) {
  //   return res.status(400).json({ message: 'Invalid credentials' });
  // }

  const user = users[email];
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user) //generating the jwt token

  return res.status(200).json({ token, user: { email: user.email } });
};

const me = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users[decoded.email];
    res.json({ user: {
      username: user.username,
      email: user.email
    }});
  } catch (e) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { register, login, me };
