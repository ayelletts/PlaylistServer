const playlistLogic = require("../BL/playlistLogic");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userLogic = require("../BL/userLogic");

router.post("/new", auth, async (req, res) => {
  //   console.log("New playlist", req.body.email);
  try {
    const playList = await playlistLogic.newPlaylist({
      title: req.body.title,
      imgUrlPl: req.body.songs.imgUrl,
      userId: req._id,
      songs: req.body.songs,
    });

    if (playList) {
      const userAndLists = await userLogic.getUserAndPlayLists(req.body.email);
      console.log("*************", userAndLists);
      res.status(200).send(userAndLists);
    } else {
      console.log("ERROR playList", playList);
      res.status(505).send("Error occured whlie creating new playlist");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

router.post("/addToList", auth, async (req, res) => {
  console.log("add to list: ", req.body);
  try {
    const playList = await playlistLogic.addToPlaylist(
      req.body.listId,
      req.body.song
    );

    if (playList) {
      const userAndLists = await userLogic.getUserAndPlayLists(req.body.email);
      console.log("----------", userAndLists);
      res.status(200).send(userAndLists);
    } else {
      console.log("ERROR playList", playList);
      res.status(505).send("Error occured whlie creating new playlist");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

module.exports = router;
