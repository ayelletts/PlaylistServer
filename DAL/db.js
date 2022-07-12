// connect to mongodb server
//import mongoose from "mongoose";
// <=>
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://ayelletts:1393dgieR@cluster0.sqv2e.mongodb.net/spotifyApp?retryWrites=true&w=majority";
// process.env.MONGO_URL;
exports.connect = async () => {
  // async - in order to use await
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true }, (err) => {
      // await - don't continue until connected to db
      if (err) {
        throw err;
      }
      console.log("connection success!", mongoose.connection.readyState);
    });
  } catch (exeption) {
    console.log("error mongoose: ", exeption);
  }
};

//module.exports = connect;
