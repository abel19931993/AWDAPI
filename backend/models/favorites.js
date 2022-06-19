const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Music = require('./music')
const favSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",
      },
    ],
  },
  {
    timestamps: true,
  }
);
var Fav = mongoose.model("Fav", favSchema);
module.exports = Fav;
