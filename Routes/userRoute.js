const userLogic = require("../BL/userLogic");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// router.all("/test", auth, (res, req) => {
//     res.send("test");
// });

router.post("/login", async (req, res) => {
  console.log("login");
  try {
    const token = await userLogic.login(req.body.email, req.body.password);
    res.send(token);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

router.post("/signup", async (req, res) => {
  //להחזיר טוקן
  try {
    console.log("req", req.body);
    const newUser = await userLogic.register(req.body);
    console.log(newUser, "newUser");
    res.send("signup");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await userLogic.getUserById(req._id);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});
// router.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// router.get("/", async (req, res) => {
//   const users = await userLogic.getAllUsers();
//   res.send(users);
// });

router.get("/new", async (req, res) => {
  try {
    const user = await userLogic.getUserById();
    res.send("ahlan");
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

router.post("/", async (req, res) => {
  const { firstName, lastName, userName } = req.body;

  const restFields = {
    password: "112233445566",
    address: {
      street: "qwerty",
      homeNum: "55",
      city: "Eilat",
    },
    gender: "female",
  };
  const user = { firstName, lastName, userName, ...restFields };
});

router.put("/edit_user/:id", async (req, res) => {
  try {
    const saveUser = await userLogic.updateUser(req.params.id, req.body);
    res.send(saveUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured :: ${error.message}`);
  }
});

module.exports = router;
