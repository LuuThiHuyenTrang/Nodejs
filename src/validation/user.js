import Joi from "joi";

const signUpValid = Joi.object({
  userName: Joi.string().required().min(6).max(255),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .max(255)
    .valid(Joi.ref("password")),
  role: Joi.string(),
});
const UpUserValid = Joi.object({
  _id: Joi.string(),
  userName: Joi.string().required().min(6).max(255),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .max(255)
    .valid(Joi.ref("password")),
  role: Joi.string(),
});
const signInValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
});

export { signUpValid, UpUserValid, signInValid };
