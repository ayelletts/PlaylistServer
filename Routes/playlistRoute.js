const userLogic = require("../BL/playlistLogic");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// router.get("/", auth, async (req, res) => {
//   try {
//     const playLists/user = await userLogic.getUserPlaylists(req._id);
//     res.send(playLists/user);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(`Error occured :: ${error.message}`);
//   }
// });

module.exports = router;
