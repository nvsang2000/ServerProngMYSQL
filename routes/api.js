var express = require('express');
var router = express.Router();

const ApiController = require('../controller/ApiController')
const upload = require('../middleware/upload')

router.get("/consult", ApiController.getAllConsult);

router.get("/consult/:id", ApiController.getConsult);

router.post("/consult", upload.single("url_image"), ApiController.postConsult)

module.exports = router;
