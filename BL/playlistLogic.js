const playlistController = require("../DAL/controllers/playlistController");
const { createToken } = require("../middleware/jwt");

exports.getUserPlaylists = async (uid) => {
  const playlists = await playlistController.read({ user: uid });
  if (playlists.length == 0) {
    throw { code: 501, message: "No playlists found for user" };
  }
  return users;
};
