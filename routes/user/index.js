var router = require('express').Router();

const isAuthenticated = require('../../middleware/isAuthenticated');
const create = require("./create")
const login = require("./login")
const logout = require("./logout")
const checkToken = require("./check-token")

router.post('/register', create);
router.post('/login', login);
router.post("/logout",isAuthenticated,logout)
router.get('/check-token', isAuthenticated,checkToken );

module.exports = router;
