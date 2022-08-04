const { playlistModel } = require("../models/playlist");

async function create(data) {
  return await playlistModel.create(data);
}
async function read(filter) {
  // const query = {
  //   "songs.$.isActive": true,
  // };
  // console.log(" pl controller read filter: ", filter);
  const result = await playlistModel.find(filter); //.find(query);
  // console.log(" pl controller read result: ", result);
  return result;
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
  return await updateOne(filter, { isActive: false });
}

async function deleteSong(playlistId, songId) {
  // console.log("deleteSong", playlistId, songId);
  const query = { _id: playlistId };
  const updateDocument = {
    $pull: { songs: { _id: songId } },
  };
  return await playlistModel.findOneAndUpdate(query, updateDocument);
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
  deleteSong,
  deleteMany,
};
