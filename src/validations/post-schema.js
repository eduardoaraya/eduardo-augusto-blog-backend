import Joi from "joi";

const postSchema = {
  title: Joi.string().required(),
  shortDescription: Joi.string().max(244).required(),
  postContent: Joi.string().required(),
  categoryId: Joi.number().required(),
  published: Joi.boolean().required(),
};

const postCreateSchema = Joi.object(postSchema);
const postUpdateSchema = Joi.object({
  ...postSchema,
  postId: Joi.number().required(),
});

export default {
  postCreateSchema,
  postUpdateSchema,
};
