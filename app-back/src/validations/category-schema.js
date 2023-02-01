import Joi from "joi";

const categorySchema = {
  name: Joi.string().required(),
  active: Joi.boolean().optional(),
};

const categoryCreateSchema = Joi.object(categorySchema);
const categoryUpdateSchema = Joi.object({
  ...categorySchema,
  categoryId: Joi.number().required(),
});

export default {
  categoryCreateSchema,
  categoryUpdateSchema,
};
