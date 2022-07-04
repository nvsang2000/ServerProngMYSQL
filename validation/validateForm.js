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


module.exports = {
  validateConsult,
  validateEquipment
};
