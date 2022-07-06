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
const validateAuth = () => {
  return [
    body("name").notEmpty().withMessage("Please provide name!"),
    body("password")
      .notEmpty()
      .withMessage("Please provide password!")
      .isLength({ min: 4, max: 16 })
      .withMessage("Please provide your Password from 4-16 character!"),
    body("email")
      .notEmpty()
      .withMessage("Please provide email!")
      .isEmail()
      .withMessage("Please enter the correct format email!"),
  ];
};
const validateAuthLogin = () => {
  return [
    body("password")
      .notEmpty()
      .withMessage("Please provide password!")
      .isLength({ min: 4, max: 16 })
      .withMessage("Please provide your Password from 4-16 character!"),
    body("email")
      .notEmpty()
      .withMessage("Please provide email!")
      .isEmail()
      .withMessage("Please enter the correct format email!"),
  ];
};

module.exports = {
  validateConsult,
  validateEquipment,
  validateMagazine,
  validateAuth,
  validateAuthLogin,
};
