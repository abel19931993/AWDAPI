const { type } = require("express/lib/response");
const mongoose = require("mongoose");
var float = require("mongoose-float").loadType(mongoose);
const ObjectID = mongoose.Schema.Types.ObjectId;

const Chapter = mongoose.Schema({
  chapter_name: {
    type: String,
  },
  chapter_audio: {
    type: String,
  },
  chapter_category: {
    type: String,
  },
  chapter_length: {
    type: String,
  },
  chapter_description: {
    type: String,
  },
  chapter_released_date: {
    type: String,
  },
});

const AudioBook = mongoose.Schema({
  author_name: {
    type: String,
    required: true,
  },
  audiobook_title: {
    type: String,
    required: true,
  },
  audiobook_description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  rate: {
    type: float,
    default: 0,
  },
  Chapters: [Chapter],
});

module.exports = mongoose.model("AudioBook", AudioBook);