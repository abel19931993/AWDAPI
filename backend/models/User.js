const mongoose = require('mongoose');
var crypto = require('crypto'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model("User",userSchema);
//Uses