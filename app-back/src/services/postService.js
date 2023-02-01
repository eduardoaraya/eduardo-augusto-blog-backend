import Post from "../models/post.js";
import Category from "../models/category.js";
import PostSchemaValidator from "../validations/post-schema.js";
import { Op } from "sequelize";
import User from "../models/user.js";

export const listAll = async (condition = {}) =>
  Post.findAll({ order: [["id", "DESC"]], ...condition });

export const listPublishedAll = async () =>
  Post.findAll({
    where: { published: true },
    order: [["id", "DESC"]],
    include: {
      model: User,
      attributes: ["fullname"],
    },
  });

export const getById = async (id) =>
  Post.findOne({
    where: { id },
  });

export const getPublisehdByUrl = async (url) =>
  Post.findOne({
    where: { url, published: true },
    include: {
      model: User,
      attributes: ["fullname"],
    },
  });

export const getPublisehdById = async (id) =>
  Post.findOne({
    where: { id, published: true },
    include: {
      model: User,
      attributes: ["fullname"],
    },
  });

export const getPublishedByCategory = async (categoryId) =>
  Post.findAll({
    where: { categoryId, published: true },
    include: {
      model: User,
      attributes: ["fullname"],
    },
  });

export const create = async (body, userId) => {
  try {
    const data = await PostSchemaValidator.postCreateSchema.validateAsync(body);
    data.url = await generateURL(data.title);

    const hasCategory = await await Category.findOne({
      where: { id: data.categoryId },
    });

    if (!hasCategory) throw new Error("Invalid category!");

    const hasTheSamePostUrl = await await Post.findOne({
      where: { url: data.url },
    });

    if (hasTheSamePostUrl) throw new Error("Invalid url!");

    const post = await Post.create({ userId, ...data });
    return {
      success: true,
      post: {
        postId: post.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
    };
  }
};

export const update = async (postId, userId, body) => {
  try {
    const data = await PostSchemaValidator.postUpdateSchema.validateAsync({
      ...body,
      postId,
    });
    delete data.postId;
    data.url = await generateURL(data.title);

    const post = await Post.findOne({
      where: {
        id: postId,
        userId,
      },
    });

    if (!post?.id) throw new Error("Post not founded!");

    const hasTheSamePostUrl = await await Post.findOne({
      where: {
        id: {
          [Op.not]: postId,
        },
        url: data.url,
      },
    });

    if (hasTheSamePostUrl) throw new Error("Invalid url!");

    await post.update(data);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
    };
  }
};

export async function generateURL(title) {
  const regexAccentsCleaner = /[\u0300-\u036f]/g;
  const regexSignalsCleaner = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

  if (!title) throw new Error("Title is required!");

  const url = title
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(regexAccentsCleaner, "")
    .replaceAll(regexSignalsCleaner, "")
    .replaceAll(" ", "-");

  return url;
}

export async function deletePost(postId, userId) {
  if (!postId || !userId) throw new Error("Paramters not defined");
  const post = await Post.findOne({
    where: {
      id: postId,
      userId,
    },
  });
  if (!post) throw new Error("Invalid post by id: " + postId);
  post.destroy();

  return true;
}
