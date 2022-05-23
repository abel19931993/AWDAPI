const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    album_title:
    {
    type:String,
    required:true
    },
     artist_name:{
     type:String,
     required:true
    },
    album_description:{
    type:String,
    },
    album_image:{
    type:String,
    required:true
    }
})
module.exports = mongoose.model('Album',albumSchema )