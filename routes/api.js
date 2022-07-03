var express = require('express');
var router = express.Router();

const ApiController = require('../controller/ApiController')
const upload = require('../middleware/upload')
const validate = require('../validation/validateForm')

router.get("/consult", ApiController.getAllConsult);

router.get("/consult/:id", ApiController.getConsult);

router.post(
  "/consult",
  upload.single("url_image"),
  validate.validateConsult(),
  ApiController.postConsult
);

router.delete("/consult/:id", ApiController.deleteConsult)

module.exports = router;
