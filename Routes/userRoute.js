const userLogic = require("../BL/userLogic");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// router.all("/test", auth, (res, req) => {
//     res.send("test");
// });

router.post("/login", async (req, res) => {
  console.log("login", req.body.email, req.body.password);
  try {
    const token = await userLogic.login(req.body.email, req.body.password);
    res.send(token);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

router.post("/signup", async (req, res) => {
  console.log("signup");
  //להחזיר טוקן
  try {
    console.log("req", req.body);
    const token = await userLogic.register(req.body);
    res.send(token);
  } catch (error) {
    res.status(511).send(error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    console.log("user router req.body:", req.headers.authorization);
    const user = await userLogic.getUserById(req._id);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

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
