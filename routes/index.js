var express = require('express');
var router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: process.env.AUTH_SECRET});
});
// router.post("/",function(req, res, next) {
//   const x = req.body
//   console.log(x)
//   res.send({ title: x.title});
// });

router.get('/test',isAuthenticated, function(req, res, next) {
  res.send({ title: 'welcommeeee' });
});

module.exports = router;
