import Joi from "joi";
const productSchema = Joi.object({
  name: Joi.string().required().min(6).max(10),
  price: Joi.number().required(),
  desc: Joi.string().required(),
});
export default productSchema;
