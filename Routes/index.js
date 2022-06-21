const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");

//.use => all requests for specific entity will be routed to one place
router.use("/users", userRoute);

module.exports = router;
