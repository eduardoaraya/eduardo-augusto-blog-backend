import { DataTypes } from "sequelize";
import { db } from "../database/db";

const Service = db.define(
  "service",
  {
    title: {
      type: DataTypes.TEXT(100),
    },
    data: {
      type: DataTypes.JSON,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Service;
