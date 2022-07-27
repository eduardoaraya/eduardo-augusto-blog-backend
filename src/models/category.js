import { DataTypes } from "sequelize";
import { db } from "../database/db.js";

const Category = db.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_parent_id: {
      type: DataTypes.STRING,
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

export default Category;
