const userController = require("../DAL/controllers/userController");
//const { userModel } = require("../DAL/models/user");
const { createToken } = require("./jwt");

let user1 = {
  firstName: "Esti",
  lastName: "Lauder",
  userName: "lauderE@gmail.com",
  password: "112233",
  gender: "female",
  mobile: "0503334445",
  address: {
    street: "kenedi",
    houseNumber: 123,
    city: "London",
  },
};

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
  const user = await userController.read({ userName: userFields.userName });
  if (user.length) {
    throw { code: 400, message: "userName already exist" };
  }
  return userController.create(userFields);
};

exports.login = async (userName, password) => {
  //basic validation
  if (!userName || !password) {
    throw { code: 400, message: "Incomplete user details" };
  }
  //user exist?
  const user = await userController.read({
    userName: userName,
    password: password,
  });
  console.log(user);
  if (!user) {
    throw { code: 404, message: "User does not exist" };
  }
  console.log("**************", user.password);

  //password match?
  if (user.password !== password) {
    throw { code: 503, message: "Unauthorized" };
  }

  return createToken(user._id);
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
