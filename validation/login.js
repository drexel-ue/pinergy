const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  // Checks if email...is one.
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Checks if email string is empty.
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Checks if password string is empty.
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
