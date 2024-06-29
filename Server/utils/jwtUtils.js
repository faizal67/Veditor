const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const generateToken = (user) => {
  return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
