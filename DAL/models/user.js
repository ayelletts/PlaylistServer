const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    street: { type: String },
    homeNum: { type: Number },
    city: { type: String },
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  lastLog: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  permission: {
    type: String,
    enum: ["viewer", "editor", "admin"],
    default: "viewer",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
