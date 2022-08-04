const playlistController = require("../DAL/controllers/playlistController");
const { createToken } = require("../middleware/jwt");

exports.getUserPlayLists = async (uid) => {
  // console.log("playlistLogic getUserPlayLists", uid);
  return await playlistController.read({ userId: uid });
};

exports.getPlayListByUid = async (uid, playlistId) => {
  // console.log(
  //   "playlistLogic getPlayListByUid uid",
  //   uid,
  //   "playlistId",
  //   playlistId
  // );
  return await playlistController.read({ userId: uid, _id: playlistId });
};

exports.newPlaylist = async (playlistDetails) => {
  // console.log("playlistdetails", playlistDetails);
  return await playlistController.create(playlistDetails);
};

exports.addToPlaylist = async (playlistId, song) => {
  // console.log("playlistdetails", playlistDetails);
  return await playlistController.updateOne(
    { _id: playlistId },
    { $push: { songs: song } }
  );
};

exports.removeSongFromPlaylist = async (playlistId, songId) => {
  // console.log("removeSongFromPlaylist playlistdetails", playlistId);

  return await playlistController.deleteSong(playlistId, songId);
};
