const { userModel } = require("../models/user");

async function create(data) {
  return await userModel.create(data);
}
async function read(filter, proj) {
  return await userModel.find(filter, proj);
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
