const express = require('express')
const mongoose = require('mongoose')
const app = express()
mongoose.connect("mongodb://localhost:27017/Awd",{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("successfully connected")
    }
})
app.use(express.json())
const musicRouter = require('./routes/music')
const albumRouter = require('./routes/album')
app.use('/music',musicRouter)
app.use('/album',albumRouter)

app.listen(3001,()=>
console.log("On port 3000"))