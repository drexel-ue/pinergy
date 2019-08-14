const Validator = require("validator");
const validText = require("./valid_text");
const User = require("../models/User");
import { merge } from "lodash";

module.exports = function validateUpdate(oldUserData, newUserData) {
  let errors = {};

  const emailTest = User.findOne({ email: newUserData.email });
  const usernameTest = User.findOne({ username: newUserData.username });

  // Check if email is in use.
  if (emailTest) {
    errors.email = `${newUserData.email} is already in use.`;
  }

  // Check if username is in use.
  if (usernameTest) {
    errors.username = `${newUserData.username} is already taken.`;
  }

  const mergedUserData = merge({}, oldUserData, newUserData);

  mergedUserData.email = validText(mergedUserData.email)
    ? mergedUserData.email
    : "";
  mergedUserData.password = validText(mergedUserData.password)
    ? mergedUserData.password
    : "";

  // Checks if email...is one.
  if (!Validator.isEmail(mergedUserData.email)) {
    errors.email = "Email is invalid";
  }

  // Checks if email string is empty.
  if (Validator.isEmpty(mergedUserData.email)) {
    errors.email = "Email field is required";
  }

  // Checks if password string is empty.
  if (Validator.isEmpty(mergedUserData.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    mergedUserData
  };
};
