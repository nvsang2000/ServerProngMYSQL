var express = require("express");
var router = express.Router();

const AuthController = require('../controller/api/AuthController')
const validate = require('../validation/validateForm');

router.get('/', AuthController.getAuth);

router.post('/login', AuthController.login);

router.post("/register", validate.validateAuth(), AuthController.register);

module.exports = router;
