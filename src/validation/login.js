const Validator = require("validator");
const isEmpty = require("./empty-check");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "E-mail указан неверно.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "E-mail должен быть указан.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Пароль должен быть указан.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
