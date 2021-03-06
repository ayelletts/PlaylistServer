const userController = require("../DAL/controllers/userController");
//const { userModel } = require("../DAL/models/user");
const { createToken } = require("../middleware/jwt");

// async function getUserDetailsById(id) {
//   //find
//   userController.readOne(id);
//   //check if null or exist
//   //return error/user
// }

// async function register() {
//   // validations
// }

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
  user = userController.create(userFields);
  return createToken(user._id);
};

exports.login = async (email, password) => {
  //basic validation
  if (!email || !password) {
    throw { code: 400, message: "Incomplete user details" };
  }
  //user exist?
  const user = await userController.read({ email }, "+password");
  if (user.length === 0) {
    throw { code: 404, message: "User does not exist" };
  }

  //password match?
  console.log("password", password, "user password", user[0].password);
  if (user[0].password !== password) {
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

  if (user.length == 0) {
    throw { code: 403, message: "User does not exist" };
  }
  return user;
};

exports.updateUser = async (id, newField) => {
  const user = await userController.updateOne({ _id: id }, newField);
  if (user.length == 0) {
    throw { code: 404, message: "Changes were not saved" };
  }
  return user;
};
