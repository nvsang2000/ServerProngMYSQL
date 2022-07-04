const { body, validationResult } = require("express-validator");

const validateConsult = () => {
  return [
    body("name").notEmpty().withMessage("Please provide name!"),
    body("place").notEmpty().withMessage("Please provide place!"),
  ];
};

const validateEquipment = () => {
  return [
    body("name").notEmpty().withMessage("Please provide name!"),
    body("place").notEmpty().withMessage("Please provide place!"),
  ];
};

const validateMagazine = () => {
  return [
    body("name").notEmpty().withMessage("Please provide name!"),
    body("place").notEmpty().withMessage("Please provide place!"),
    body("area").notEmpty().withMessage("Please provide area!"),
  ];
};


module.exports = {
  validateConsult,
  validateEquipment,
  validateMagazine
};
