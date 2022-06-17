const { type } = require("express/lib/response");
const mongoose = require("mongoose");
var float = require("mongoose-float").loadType(mongoose);
const ObjectID = mongoose.Schema.Types.ObjectId;

const Episode = mongoose.Schema({
  episode_name: {
    type: String,
  },
  episode_audio: {
    type: String,
  },
  episode_category: {
    type: String,
  },
  episode_length: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  episode_description: {
    type: String,
  },
  episode_released_date: {
    type: String,
  },
});

const PodcastSchema = mongoose.Schema({
  artist_name: {
    type: String,
    required: true,
  },
  podcast_title: {
    type: String,
    required: true,
  },
  podcast_description: {
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
  episodes: [Episode],
});

module.exports = mongoose.model("PodcastSchema", PodcastSchema);