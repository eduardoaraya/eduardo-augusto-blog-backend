import * as postService from "../services/postService.js";

export async function listPublishedAll(_req, res) {
  try {
    const data = await postService.listPublishedAll();
    return res.json({
      data,
    });
  } catch (_err) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

export async function listPublishedAllByCategory(req, res) {
  try {
    const categoryId = req.param("categoryId");
    const data = await postService.getPublishedByCategory(categoryId);
    return res.json({
      data,
    });
  } catch (_err) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

export async function listAll(req, res) {
  try {
    const data = await postService.listAll({ userId: req.auth.id });
    return res.json({
      data,
    });
  } catch (_err) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

export async function create(req, res) {
  try {
    const { success, error, post } = await postService.create(
      req.body,
      req.auth.id
    );
    const status = success ? 201 : 400;
    return res.status(status).json({
      success,
      error,
      post,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}

export async function update(req, res) {
  try {
    const postId = req.param("id");
    const { success, error } = await postService.update(
      postId,
      req.auth.id,
      req.body
    );
    const status = success ? 201 : 400;
    return res.status(status).json({
      success,
      error,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}

export async function getPublishedByUrl(req, res) {
  try {
    const url = req.param("url");
    const data = await postService.getPublisehdByUrl(url);
    return res.status(200).json({
      data,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}

export async function getPublishedById(req, res) {
  try {
    const postId = req.param("id");
    const data = await postService.getPublisehdById(postId);
    return res.status(200).json({
      data,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}

export async function getById(req, res) {
  try {
    const { id: postId } = req.params;
    const data = await postService.getById(postId);
    return res.status(200).json({
      data,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}

export async function generateUrl(req, res) {
  try {
    const { title } = req.body;
    const data = await postService.generateURL(title);
    return res.status(200).json({
      data,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}

export async function deletePost(req, res) {
  try {
    const postId = req.param("id");
    const data = await postService.deletePost(postId, req.auth.id);
    return res.status(201).json({
      data,
    });
  } catch (_err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: _err });
  }
}
