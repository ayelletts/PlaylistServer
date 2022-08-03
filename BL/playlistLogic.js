const playlistController = require("../DAL/controllers/playlistController");
const { createToken } = require("../middleware/jwt");

exports.getUserPlayLists = async (uid) => {
  // console.log("playlistLogic getUserPlayLists", uid);
  return await playlistController.read({ userId: uid });
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
