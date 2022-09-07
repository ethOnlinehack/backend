const router = require('express').Router();
const create = require("./create");
const getAll = require("./get-all")
const update = require("./update")
const getOne = require("./get-one")

router.post('/create', create);
router.get("/get-all",getAll)
router.put("/update/:gameId",update)
router.get("/get-one/:gameId",getOne)
router.delete("/delete/:gameId")
module.exports = router;
