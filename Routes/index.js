const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const playlistRoute = require("./playlistRoute");

//.use => all requests for specific entity will be routed to one place
router.use("/users", userRoute);
router.use("/playlist", playlistRoute);

module.exports = router;
