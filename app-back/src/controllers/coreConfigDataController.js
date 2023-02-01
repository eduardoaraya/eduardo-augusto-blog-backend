const CoreConfigData = require("../models/coreConfigData");

async function getByPath(req, res) {
  try {
    const { path } = req.body;
    return res.json({
      data: await CoreConfigData.findOne({
        where: {
          path,
        },
      }),
    });
  } catch (_err) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

export default {
  getByPath,
};
