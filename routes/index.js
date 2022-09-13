var express = require("express");
const Gamer = require("../models/Gamer");
var router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
/* GET home page. */
router.post("/", async function (req, res) {

  console.log(req.body)
  res.status(200).json({message:req.body.test});
});
router.get("/", async function (req, res) {

  console.log(req.body)
  res.status(200).json({message:"hello"});
});
// router.post("/",function(req, res, next) {
//   const x = req.body
//   console.log(x)
//   res.send({ title: x.title});
// });

router.get("/test",isAuthenticated, function (req, res) {
  console.log(req.user)
  res.status(200).send({ title: "welcommeeee" });
});

module.exports = router;
