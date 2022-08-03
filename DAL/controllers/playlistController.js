const { playlistModel } = require("../models/playlist");

async function create(data) {
  return await playlistModel.create(data);
}
async function read(filter, proj) {
  // console.log(" pl controller filter:s ", filter);
  return await playlistModel.find(filter, proj);
}
async function readOne(filter) {
  return await playlistModel.findOne(filter);
}
async function updateOne(filter, newData) {
  return await playlistModel.updateOne(filter, newData);
}
async function updateMany(filter, newData) {
  return await playlistModel.updateMany(filter, newData);
}
async function deleteOne(filter) {
  return await playlistModel(filter, { isActive: false });
}
async function deleteMany(filter) {
  return await playlistModel(filter, { isActive: false });
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
