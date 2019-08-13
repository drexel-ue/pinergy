const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  // // Makes sure username length is in range.
  // if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
  //   errors.username = "Username must be between 2 and 30 characters";
  // }

  // // Makes sure username string is not empty.
  // if (Validator.isEmpty(data.username)) {
  //   errors.username = "Username field is required";
  // }

  // Makes sure email string is not empty.
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Makes sure email...is one.
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Makes sure password string is not empty.
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Makes sure password length is in range.
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // Makes sure password confirmation string is not empty.
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  // Makes sure passowrd and pasword confirmation strings match.,
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
