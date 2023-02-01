import { DataTypes } from "sequelize";
import { db } from "../database/db";

const CoreConfigData = db.define(
  "core_config_data",
  {
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    resolve: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    secret: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default CoreConfigData;
