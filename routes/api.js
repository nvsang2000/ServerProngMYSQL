var express = require('express');
var router = express.Router();

const ConsultController = require('../controller/api/ConsultController');
const EquipmentController = require('../controller/api/EquipmentController');
const upload = require('../middleware/upload');
const validate = require('../validation/validateForm');

router.get("/consult", ConsultController.getAllConsult);

router.get("/consult/:id", ConsultController.getConsult);

router.post(
  "/consult",
  upload.single("url_image"),
  validate.validateConsult(),
  ConsultController.postConsult
);

router.delete("/consult/:id", ConsultController.deleteConsult)

router.put(
  "/consult/:id",
  upload.single("url_image"),
  validate.validateConsult(),
  ConsultController.putConsult
);
// API equipment
router.get("/equipment", EquipmentController.getAllEquipment);

router.get("/equipment/:id", EquipmentController.getEquipment);

router.post(
  "/equipment",
  upload.single("url_image"),
  validate.validateEquipment(),
  EquipmentController.postEquipment
);

router.delete("/equipment/:id", EquipmentController.deleteEquipment);

router.put(
  "/equipment/:id",
  upload.single("url_image"),
  validate.validateEquipment(),
  EquipmentController.putEquipment
);
module.exports = router;
