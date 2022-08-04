const mongoose = require("mongoose");
const { SchemaTypes } = mongoose;
require("./user");

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrlPl: {
    type: String,
    required: true,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  songs: [
    {
      songId: String,
      videoUrl: String,
      imgUrl: String,
      title: String,
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

const playlistModel = mongoose.model("playlist", playlistSchema);
module.exports = { playlistModel };
