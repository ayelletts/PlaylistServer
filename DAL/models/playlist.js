const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
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
      itemId: { type: String },
    },
  ],
});

const song = mongoose.model("playlist", songSchema);
module.exports = { playlistModel };
