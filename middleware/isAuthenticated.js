// middleware.js
const jwt = require('jsonwebtoken');

function isAuthenticated (req, res, next) {
  const token = req.cookies["access-token"];
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}
module.exports = isAuthenticated;