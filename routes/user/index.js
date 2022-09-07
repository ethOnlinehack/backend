var router = require('express').Router();
const isAuthenticated = require('../../middleware/isAuthenticated');
const createUser = require("./create")
const loginUser = require("./login")
const logout = require("./logout")
const checkToken = require("./check-token")

router.post('/register', createUser);
router.post('/login', loginUser);
router.post("/logout",isAuthenticated,logout)
router.get('/check-token', isAuthenticated,checkToken );

module.exports = router;
