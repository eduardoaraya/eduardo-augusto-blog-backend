import Category from "../models/category.js";
import CategorySchema from "../validations/category-schema.js";

export const findAll = async () => await Category.findAll();

export const findActiveAll = async () =>
  await Category.findAll({
    where: {
      active: true,
    },
  });

export const create = async (body) => {
  try {
    const data = await CategorySchema.categoryCreateSchema.validateAsync(body);
    const category = await Category.create(data);
    return {
      success: true,
      category: {
        categoryId: category.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const update = async (categoryId, body) => {
  try {
    const data = await CategorySchema.categoryUpdateSchema.validateAsync({
      ...body,
      categoryId,
    });

    delete data.categoryId;
    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category?.id)
      throw new Error(`Not found category with id: ${categoryId}`);

    await category.update(data);

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

export async function deleteCategory(categoryId) {
  if (!categoryId) throw new Error("Paramters not defined");
  const category = await Category.findOne({
    where: {
      id: categoryId,
    },
  });
  if (!category) throw new Error("Invalid category by id: " + categoryId);
  category.destroy();

  return true;
}
