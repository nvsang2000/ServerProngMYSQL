var express = require("express");
var router = express.Router();

const AuthController = require('../controller/api/AuthController')

router.get('/', AuthController.getAuth);

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

module.exports = router;
