const { playlistModel } = require("../models/playlist");

async function create(data) {
  // console.log("~~~~~~~ playlist create", data);
  try {
    return await playlistModel.create(data);
  } catch (error) {
    console.log("error", error.code);
    if (error.code === 11000) {
      const playlist = await playlistModel.findOne({
        userId: data.userId,
        title: data.title,
      });
      // console.log("playlist", playlist);

      if (playlist) {
        if (playlist.isActive == false) {
          throw {
            code: 509,
            playlistId: playlist._id,
            message:
              "A list with the same name already exists but not active, activate list?",
          };
        }
        throw {
          code: 510,
          message:
            "A list with the same name already exists, please add song to existing list",
        };
      }
    } else {
      throw error;
    }
  }
}

async function read(filter) {
  // const query = {
  //   "songs.$.isActive": true,
  // };
  // console.log(" pl controller read filter: ", filter);
  const result = await playlistModel.find(filter);
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

async function updateSongMark(playlistId, songId) {
  // console.log("updateSongMark", playlistId, songId);
  const query = { _id: playlistId, "songs._id": songId };
  const updateDocument = {
    $inc: { "songs.$.songMark": 1, listMark: 1 },
    tests: { $each: [], $sort: -1 },
  };
  return await playlistModel.findOneAndUpdate(query, updateDocument);
}

async function updateListMark(playlistId) {
  // console.log("updateListMark", playlistId, songId);
  const query = { _id: playlistId };
  const updateDocument = {
    $inc: { listMark: 1 },
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
  updateSongMark,
  updateListMark,
  updateMany,
  deleteOne,
  deleteSong,
  deleteMany,
};
