var express = require("express");
const Gamer = require("../models/Gamer");
var router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
/* GET home page. */
router.get("/", async function (req, res) {

  const gamer = await Gamer.findById("631b07c25f18b4d29345b2f1")
  console.log(JSON.parse(JSON.stringify(gamer.nfts)))
  res.json(gamer);
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
