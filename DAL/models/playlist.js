const mongoose = require("mongoose");
const { SchemaTypes } = mongoose;
require("./user");

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  songs: [
    {
      songId: String,
      videoUrl: String,
      imgUrl: String,
      title: String,
    },
  ],
});

const playlistModel = mongoose.model("playlist", playlistSchema);
module.exports = { playlistModel };
