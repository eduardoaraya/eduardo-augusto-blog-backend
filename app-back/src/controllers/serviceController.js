const Service = require("../models/service");

async function listAll(_req, res) {
  try {
    const data = await Service.findAll({
      where: {
        active: true,
      },
    });
    return res.json({ data });
  } catch (_err) {
    return res.json({ data: {}, error: _err });
  }
}

export default {
  listAll,
};
