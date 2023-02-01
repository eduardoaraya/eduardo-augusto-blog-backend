import { DataTypes } from "sequelize";
import { db } from "../database/db.js";
import Category from "./category.js";
import User from "./user.js";

const Post = db.define(
  "post",
  {
    postContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Post.belongsTo(Category, {
  foreignKey: "categoryId",
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

export default Post;
