var express = require('express');
var router = express.Router();
const User = require("../models/User")
const isAuthenticated = require('../middleware/isAuthenticated');
const jwt = require('jsonwebtoken');


router.post('/register', function(req, res) {
  const { email, password } = req.body;

  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again." + err);
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

router.post('/login', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: '48h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
});
router.post("/logout",isAuthenticated,function(req,res,next){
  res.clearCookie('token').sendStatus(200);

})
router.get('/check-token', isAuthenticated, function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
