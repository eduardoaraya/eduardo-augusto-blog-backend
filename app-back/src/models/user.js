import { DataTypes } from "sequelize";
import { db } from "../database/db.js";
import bcrypt from "bcrypt";

export const userTypes = {
  admin: "ADMIN",
  dev: "DEV",
  guest: "GUEST",
};

const User = db.define(
  "user",
  {
    firstname: {
      type: DataTypes.TEXT(100),
    },
    lastname: {
      type: DataTypes.TEXT(100),
    },
    fullname: {
      type: DataTypes.TEXT(244),
    },
    email: {
      type: DataTypes.TEXT(244),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT(244),
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM(Object.values(userTypes)),
      defaultValue: userTypes.guest,
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

async function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
}

async function validPassword(password) {
  return bcrypt.compare(password, this.password);
}

User.prototype.validPassword = validPassword;
User.prototype.generateHash = generateHash;

User.beforeSave(async (user, _opt) => {
  user.password = await user.generateHash(user.password);
});

export default User;
