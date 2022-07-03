const { body, validationResult } = require("express-validator");

//validate Register Form
const validateConsult = () => {
  return [
    body("name").notEmpty().withMessage("Please provide name!"),
    body("place").notEmpty().withMessage("Please provide place!"),
  ];
};


module.exports = {
  validateConsult,
};
