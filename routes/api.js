var express = require('express');
var router = express.Router();

var ApiController = require('../controller/ApiController')

router.get("/consult", ApiController.getAllConsult);

router.get("/consult/:id", ApiController.getConsult);

module.exports = router;
