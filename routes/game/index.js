const router = require('express').Router();
const create = require("./create");
const getAll = require("./get-all")
const update = require("./update")
const getOne = require("./get-one")
const apiRef = require("./api-reference");
const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/create',isAuthenticated, create);
router.get("/get-all",getAll)
router.put("/update/:gameId",update)
router.get("/get-one/:gameId",getOne)
router.get("/api-reference",apiRef)

router.delete("/delete/:gameId")
module.exports = router;
