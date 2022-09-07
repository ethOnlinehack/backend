const router = require('express').Router();
const create = require("./create");

router.post('/create', create);


module.exports = router;
