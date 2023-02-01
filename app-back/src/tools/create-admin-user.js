import "../database/db.js";
import User from "../models/user.js";

(async function () {
  await User.create({
    firstname: "Eduardo",
    lastname: "Augusto",
    fullname: "Eduardo Augusto",
    email: "eduardoaraya@admin.com",
    password: "123123",
    userType: "ADMIN",
    active: true,
  });
  console.log("> Created!");
  process.exit(0);
})();
