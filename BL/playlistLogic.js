const playlistController = require("../DAL/controllers/playlistController");
const { createToken } = require("../middleware/jwt");

exports.getUserPlayLists = async (uid) => {
  // console.log("playlistLogic getUserPlayLists", uid);
  return await playlistController.read({ userId: uid, isActive: true });
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
  // console.log("----- newPlaylist", playlistDetails);
  let res = await playlistController.create(playlistDetails);
  // console.log("----- newPlaylist res", res);
  return res;
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

exports.deletePlaylist = async (playlistId) => {
  // console.log("deletePlaylist playlistdetails", playlistId);

  return await playlistController.deleteOne({ _id: playlistId });
};

exports.activatePlaylist = async (playlistId) => {
  // console.log("activatePlaylist playlistdetails", playlistId);

  return await playlistController.updateOne(
    { _id: playlistId },
    { isActive: true }
  );
};

exports.updateSongMark = async (playlistId, songId) => {
  // console.log("removeSongFromPlaylist playlistdetails", playlistId);

  return await playlistController.updateSongMark(playlistId, songId);
};

exports.updateListMark = async (playlistId) => {
  // console.log("removeSongFromPlaylist playlistdetails", playlistId);

  return await playlistController.updateListMark(playlistId);
};
