var router = require('express').Router();

const isAuthenticated = require('../../middleware/isAuthenticated');
const upload = require("./upload")

router.post('/upload', isAuthenticated, upload);


module.exports = router;
