var express = require('express');
var router = express.Router();

const ConsultController = require('../controller/api/ConsultController');
const EquipmentController = require('../controller/api/EquipmentController');
const MagazineController = require('../controller/api/MagazineController');
const AuthController = require('../controller/api/AuthController');
const upload = require('../middleware/upload');
const validate = require('../validation/validateForm');

//get user
router.get("/user", AuthController.getAuth);

// API consult
router.get("/consult", ConsultController.getAllConsult);

router.get("/consult/:id", ConsultController.getConsult);

router.post(
  "/consult",
  upload.single("url_image"),
  validate.validateConsult(),
  ConsultController.postConsult
);

router.patch("/consult/:id", ConsultController.deleteConsult)

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

// API magazine
router.get("/magazine", MagazineController.getAllMagazine);

router.get("/magazine/:id", MagazineController.getMagazine);

router.post(
  "/magazine",
  validate.validateMagazine(),
  MagazineController.postMagazine
);

router.delete("/magazine/:id", MagazineController.deleteMagazine);

router.put(
  "/magazine/:id",
  validate.validateMagazine(),
  MagazineController.putMagazine
);


module.exports = router;
