var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});
router.post("/",function(req, res, next) {
  const x = req.body
  console.log(x)
  res.send({ title: x.title});
});

module.exports = router;
