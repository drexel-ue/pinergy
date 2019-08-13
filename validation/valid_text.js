// Makes sure we are working with a non-empty string.
const validText = str => {
  return typeof str === "string" && str.trim().length > 0;
};

module.exports = validText;
