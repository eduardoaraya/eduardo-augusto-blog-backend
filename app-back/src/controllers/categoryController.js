import * as categoryService from "../services/categoryService.js";

export async function listAll(_req, res) {
  try {
    const data = await categoryService.findAll();
    return res.json({ data });
  } catch (_err) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

export async function listActiveAll(_req, res) {
  try {
    const data = await categoryService.findActiveAll();
    return res.json({ data });
  } catch (_err) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

export async function create(req, res) {
  try {
    const { success, error, category } = await categoryService.create(req.body);
    const status = success ? 201 : 400;
    return res.status(status).json({
      success,
      error,
      category,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!", error });
  }
}

export async function update(req, res) {
  try {
    const categoryId = req.param("id");
    const { success, error } = await categoryService.update(
      categoryId,
      req.body
    );
    const status = success ? 201 : 400;
    return res.status(status).json({
      success,
      error,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!", error });
  }
}

export async function deleteCategory(req, res) {
  try {
    const categoryId = req.param("id");
    const data = await categoryService.deleteCategory(categoryId);
    return res.status(201).json({
      data,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}
