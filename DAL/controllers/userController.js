const { userModel } = []; //require("../models/user");

const user1 = {
  firstName: "Esti",
  lastName: "Lauder",
  userName: "lauderE",
  password: "112233",
  gender: "female",
  mobile: "0503334445",
  address: {
    street: "kenedi",
    houseNumber: 123,
    city: "London",
  },
};

async function create(data) {
  return await userModel.create(data);
}
//async function read(filter, proj) {
async function read(filter) {
  return user1;
  //return await userModel.find(filter, proj);
}
async function readOne(filter) {
  return await userModel.findOne(filter);
}
async function updateOne(filter, newData) {
  return await userModel.updateOne(filter, newData);
}
async function updateMany(filter, newData) {
  return await userModel.updateMany(filter, newData);
}
async function deleteOne(filter) {
  return await updateOne(filter, { isActive: false });
}
async function deleteMany(filter) {
  return await updateMany(filter, { isActive: false });
}

module.exports = {
  create,
  read,
  readOne,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
};
