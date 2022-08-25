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
  listMark: { type: Number, default: 0 },
  songs: [
    {
      songId: String,
      videoUrl: String,
      imgUrl: String,
      title: String,
      songMark: { type: Number, default: 0 },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

playlistSchema.index({ userId: 1, title: 1 }, { unique: true });

const playlistModel = mongoose.model("playlist", playlistSchema);
module.exports = { playlistModel };
