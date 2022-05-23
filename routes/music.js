const express = require('express')

const router = express.Router()
const Music = require('../models/music')
const Album = require('../models/album')

//Get All music
router.get('/', async(req,res)=>{
    try{
        const music = await Music.find()
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(music)
    }catch(err){
        res.send('Error '+err)
    }
})

//Music Add route
router.post('/',async(req,res)=>{
    const music = new Music({
        title:req.body.title,
        artist_name:req.body.artist_name,
        music_description:req.body.music_description,
        image:req.body.image,
        path:req.body.path,
        rate:req.body.rate
    })
    try{
        const addMusic = await music.save();
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(addMusic);
    }
    catch(err){
        res.send("Error "+ err)
    }
})

//Get Specific Music
router.get("/:music_id",async(req,res)=>{
    try{
        const music = await Music.findById(req.params.music_id);
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(music)
    }catch(err){
        res.send('Error '+err)
    }
        
})

//Delete All Music
router.delete("/",async(req,res)=>{
    try{
    const music  =await Music.remove({})
    res.statusCode = "200"
    res.setHeader('Content-Type','application/json')
    res.json(music)
    }catch(err){
       res.send('Error '+err)
    }
})

//Delete Specific Music
router.delete("/:music_id",async(req,res)=>{
    try{
    const music = await Music.findByIdAndRemove(req.params.music_id);
    res.statusCode = "200"
    res.setHeader('Content-Type','application/json')
    res.json(music)
    }catch(err){
        res.send('Error'+ err)
    }
})

//Update specific Music
router.put("/:music_id",async(req,res)=>{
    try{ 
  const music = await Music.findByIdAndUpdate(req.params.music_id,{
      $set:req.body,
  },{new:true})
  res.statusCode = "200"
  res.setHeader('Content-Type','application/json')
  res.json(music)
  }catch(err){
     res.send('Error '+err)
  }
})
module.exports = router