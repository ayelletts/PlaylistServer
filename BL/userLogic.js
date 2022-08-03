const userController = require("../DAL/controllers/userController");
const playlistsLogic = require("../BL/playlistLogic");
//const { userModel } = require("../DAL/models/user");
const { createToken } = require("../middleware/jwt");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.getAllUsers = async () => {
  const users = await userController.read({});
  if (users.length == 0) {
    throw { code: 401, message: "No users found" };
  }
  return users;
};

exports.register = async (userFields) => {
  let user = await userController.read({ email: userFields.email });
  console.log("********** user *************", user);

  if (user.length > 0) {
    throw { code: 400, message: "email already exist" };
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userFields.password, salt);
  userFields.salt = salt;
  userFields.hashedPassword = hashedPassword;

  user = await userController.create(userFields);
  console.log("user", user);
  return createToken(user._id);
};

exports.login = async (email, password) => {
  //basic validation
  if (!email || !password) {
    throw { code: 400, message: "Incomplete user details" };
  }
  const user = await userController.read({ email }, "+salt +hashedPassword");
  // console.log("*/*/*/*/*/*/*/*/*/ user:", user);
  //user exist?
  if (user.length === 0) {
    throw { code: 404, message: "User does not exist" };
  }

  //password match?
  // console.log(
  //   "salt",
  //   user[0].salt,
  //   "user hashed password",
  //   user[0].hashedPassword
  // );
  let hash = await bcrypt.hash(password, user[0].salt);
  if (hash !== user[0].hashedPassword) {
    throw { code: 503, message: "Unauthorized" };
  }

  return createToken(user[0]._id);
};

exports.createUser = async (userFields) => {
  const user = await userController.read({ userName: userFields.userName });
  if (user.length) {
    throw { code: 400, message: "userName already exist" };
  }
  return userController.create(userFields);
};

exports.getUserById = async (id) => {
  const user = await userController.read({ _id: id });
  // console.log("user", user);
  if (user.length == 0) {
    throw { code: 403, message: "User does not exist" };
  }
  return user[0];
};

exports.getUserAndPlayLists = async (email) => {
  // console.log("userLogic getUserAndPlayLists", email);
  const user = await userController.read({ email });
  // console.log("user", user);

  if (user.length == 0) {
    throw { code: 403, message: "User does not exist" };
  }
  const playLists = await playlistsLogic.getUserPlayLists(user[0]._id);
  // console.log("playLists", playLists);
  return {
    email: user[0].email,
    name: user[0].firstName,
    playlists: playLists,
  };
};

exports.updateUser = async (id, newField) => {
  const user = await userController.updateOne({ _id: id }, newField);
  if (user.length == 0) {
    throw { code: 404, message: "Changes were not saved" };
  }
  return user;
};
