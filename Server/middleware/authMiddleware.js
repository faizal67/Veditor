const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);          //get user data from the token 
    req.user = decoded;        
    next();                                                 //calling the next function
  } catch (e) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
