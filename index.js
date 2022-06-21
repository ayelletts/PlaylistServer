require("dotenv").config();
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

const router = require("./Routes");

app.use(express.json());
app.use(require("cors")());

// function loger(res, req, next) {
//   console.log("log");
//   next();
// }

app.use("/", router);

app.listen(port, () => console.log(`server is running => ${port}`));
//require("./DAL/db").connect();
