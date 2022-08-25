const playlistLogic = require("../BL/playlistLogic");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userLogic = require("../BL/userLogic");

router.post("/new", auth, async (req, res) => {
  console.log("New playlist", req.body.email);
  try {
    const playList = await playlistLogic.newPlaylist({
      title: req.body.title,
      imgUrlPl: req.body.songs.imgUrl,
      userId: req._id,
      songs: req.body.songs,
    });
    // console.log("New playlist res playlist", playList);

    if (playList) {
      const userAndLists = await userLogic.getUserAndPlayLists(req.body.email);
      //   console.log("*************", userAndLists);
      res.status(200).send(userAndLists);
    } else {
      console.log("ERROR playList", playList);
      res.status(505).send("Error occured whlie creating new playlist");
    }
  } catch (error) {
    if (error.code === 509 || error.code === 510) {
      console.log(error.message);
      res.status(error.code).send(`${error.message}~${error.playlistId}`);
    } else {
      res.status(503).send(`Error occured :: ${error.message}`);
    }
  }
});

router.post("/addToList", auth, async (req, res) => {
  //   console.log("add to list: ", req.body);
  try {
    const playList = await playlistLogic.addToPlaylist(
      req.body.listId,
      req.body.song
    );

    if (playList) {
      const userAndLists = await userLogic.getUserAndPlayLists(req.body.email);
      //   console.log("----------", userAndLists);
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

router.post("/share", auth, async (req, res) => {
  // console.log("--- share list: ", req.body);
  try {
    const user = await userLogic.getUserByEmail(req.body.shareWithEmail);
    // console.log("---", user);

    if (user) {
      // console.log("songs before: ", req.body.songs);
      for (let song of req.body.songs) {
        song.songMark = 0;
      }
      // console.log("songs after: ", req.body.songs);
      await playlistLogic.newPlaylist({
        title: req.body.title,
        imgUrlPl: req.body.imgUrl,
        userId: user._id,
        songs: req.body.songs,
      });
      res.status(200).send("OK");
    } else {
      res.status(410).send("Email not found");
    }
  } catch (error) {
    console.log("^^^^^^^^^", error.code);
    if (error.code === 11000) {
      res.status(506).send(`Playlist with the same name already exists`);
    } else if (error.code === 403) {
      res.status(507).send(error.message);
    } else {
      res.status(500).send(`Error occured :: ${error.message}`);
    }
  }
});

router.delete("/deleteSong", auth, async (req, res) => {
  //   console.log("remove song from list: ", req.body);
  try {
    await playlistLogic.removeSongFromPlaylist(
      req.body.playlistId,
      req.body.songId
    );

    const userAndLists = await userLogic.getUserAndPlayListsByUid(
      req.body.userId
    );
    // console.log("----------", userAndLists);

    const selectedPlaylist = await playlistLogic.getPlayListByUid(
      req.body.userId,
      req.body.playlistId
    );
    // console.log("---------- selectedPlaylist", selectedPlaylist);
    const resData = { user: userAndLists, selectedPlaylist: selectedPlaylist };
    res.status(200).send(resData);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

router.delete("/deletePlaylist", auth, async (req, res) => {
  //   console.log("delete list: ", req.body);
  try {
    await playlistLogic.deletePlaylist(req.body.playlistId);

    const userAndLists = await userLogic.getUserAndPlayListsByUid(
      req.body.userId
    );
    // console.log("----------", userAndLists);
    // console.log("---------- selectedPlaylist", selectedPlaylist);
    if (userAndLists) {
      const resData = { user: userAndLists };
      res.status(200).send(resData);
    } else {
      res.status(410).send("Email not found");
    }
  } catch (error) {
    console.log(error);
    res.status(504).send(`Error occured :: ${error.message}`);
  }
});

router.post("/activate", auth, async (req, res) => {
  // console.log("activatePlaylist: ", req.body);
  try {
    await playlistLogic.activatePlaylist(req.body.playlistId);

    const userAndLists = await userLogic.getUserAndPlayLists(req.body.email);
    //  console.log("----------", userAndLists);
    // console.log("---------- selectedPlaylist", selectedPlaylist);
    if (userAndLists) {
      const resData = { user: userAndLists };
      res.status(200).send(resData);
    } else {
      res.status(410).send("Email not found");
    }
  } catch (error) {
    console.log(error);
    res.status(504).send(`Error occured :: ${error.message}`);
  }
});

router.post("/updateSongMark", auth, async (req, res) => {
  // console.log("updateSongMark: ", req.body);
  try {
    await playlistLogic.updateSongMark(req.body.playlistId, req.body.songId);

    const userAndLists = await userLogic.getUserAndPlayListsByUid(
      req.body.userId
    );
    // console.log("----------", userAndLists);

    const selectedPlaylist = await playlistLogic.getPlayListByUid(
      req.body.userId,
      req.body.playlistId
    );
    // console.log("---------- selectedPlaylist", selectedPlaylist);
    const resData = { user: userAndLists, selectedPlaylist: selectedPlaylist };
    res.status(200).send(resData);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

router.post("/updateListMark", auth, async (req, res) => {
  //   console.log("remove song from list: ", req.body);
  try {
    await playlistLogic.updateListMark(req.body.playlistId);

    const userAndLists = await userLogic.getUserAndPlayListsByUid(
      req.body.userId
    );
    // console.log("----------", userAndLists);

    const selectedPlaylist = await playlistLogic.getPlayListByUid(
      req.body.userId,
      req.body.playlistId
    );
    // console.log("---------- selectedPlaylist", selectedPlaylist);
    const resData = { user: userAndLists, selectedPlaylist: selectedPlaylist };
    res.status(200).send(resData);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

module.exports = router;
