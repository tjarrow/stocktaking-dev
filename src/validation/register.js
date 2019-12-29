const Validator = require("validator");
const isEmpty = require("./empty-check");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.company_name = !isEmpty(data.company_name) ? data.company_name : ";"
  data.login = !isEmpty(data.login) ? data.login : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.company_name)) {
    errors.company_name = "Название организации должно быть заполнено.";
  }

  if (!Validator.isLength(data.login, { min: 6, max: 30 })) {
    errors.login = "Длина логина должна быть от 6 до 30 символов.";
  }

  if (Validator.isEmpty(data.login)) {
    errors.login = "Имя должно быть указано.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "E-mail должен быть указан";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "E-mail указан неверно";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Пароль должен быть указан";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Длина пароля должна быть от 6 до 30 символов.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Вы должны подтвердить пароль";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Пароли не совпадают";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
