const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const cookieParser = require('cookie-parser')

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
app.use(cookieParser())
app.use(express.json())
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
const userRouter = require('./routes/user-routes')
const musicRouter = require('./routes/music')
const albumRouter = require('./routes/album')
const podcastRouter = require('./routes/podcast')
const episodeRouter = require('./routes/episode')
const audioBookRouter = require('./routes/audioBook')
const chapterRouter = require('./routes/chapters')

app.use('/music',musicRouter)
app.use('/album',albumRouter)
app.use('/podcast',podcastRouter)
app.use('/episode',episodeRouter)
app.use('/audiobook',audioBookRouter)
app.use('/chapter',chapterRouter)
app.use('/user',userRouter);
app.listen(5000,()=>
console.log("On port 5000"))