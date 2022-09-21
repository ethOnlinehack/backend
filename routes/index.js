var express = require("express");
var router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
/* GET home page. */
router.get("/", async function (req, res) {
  console.log(req.headers)
  res.status(200).send("okkkk");
});
router.get("/test", isAuthenticated, async function (req, res) {
console.log(req.user)
  res.status(200).json({message:"helloxx"});
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
