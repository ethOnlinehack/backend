const router = require('express').Router();
const create = require("./create");
const getAll = require("./get-all-by-game-id")
const update = require("./update")
const getOne = require("./get-one")

router.post('/create', create);
router.post("/update/:nftId",update)
router.get("/get-one/:nftId",getOne)
router.get("/get-all/:gameId",getAll)
router.delete("/delete/:nftId")

module.exports = router;
