const express = require('express')

const router = express.Router()
const Music = require('../models/music')
const Album = require('../models/album')
const { init } = require('../models/music')

router.get('/', async(req,res)=>{
    try{
        const album = await Album.find()
        res.statusCode = "200";
        res.setHeader('Content-Type','application/json')
        res.json(album)
    }catch(err){
        res.send('Error '+err)
    }
})
//Album Add route
router.post('/',async(req,res)=>{
    var Musicid = ''
    var Albumid = ''
    
    const album = new Album({
        album_title:req.body.album_title,
        artist_name:req.body.artist_name,
        album_description:req.body.album_description,
        album_image:req.body.album_image
    })
    try{
      
        const addAlbum = await album.save()
        Albumid = addAlbum._id
    
        for(var i=0;i<req.body.music.length;i++)
        {
       const music  = new Music({
        title:req.body.music[i].title,
        artist_name:req.body.music[i].artist_name,
        music_description:req.body.music[i].music_description,
        image:req.body.music[i].image,
        path:req.body.music[i].path,
        rate:req.body.music[i].rate,
        album:Albumid
    })
       const addMusic = await music.save()
    
        }  
    }
   
    catch(err){
        res.send('Error')
    }
   
})
//Get Specific Album
router.get("/:album_id",async(req,res)=>{
    var mus = ""
    try{
        const album = await Album.findById(req.params.album_id);
        const music = await Music.find({music:{$elemMarch:{"album":req.params.album_id}}})
    
        for(var i =0 ;i<music.length;i++)
        {
            if(req.params.album_id === music[i].album)
            {
                 mus =  mus + await Music.findById(music[i]._id)
            
            }
        }
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        console.log(album + mus)
    }catch(err){
        res.send('Error '+err)
    }
})
//Update specific Album
router.put("/:album_id",async(req,res)=>{
    try{ 
  const album = await Album.findByIdAndUpdate(req.params.album_id,{
      $set:req.body,
  },{new:true})
  res.statusCode = "200"
  res.setHeader('Content-Type','application/json')
  res.json(album);
  }catch(err){
     res.send('Error '+err)
  }
})
//Delete  Album


//Delete Specific Album
router.delete("/:album_id",async(req,res)=>{
    console.log("In the delete part")
    try{
     const album = await Album.findByIdAndRemove(req.params.album_id);
     const music = await Music.find({music:{$elemMarch:{"album":req.params.album_id}}})
    
    for(var i =0 ;i<music.length;i++)
    {
        if(req.params.album_id === music[i].album)
        {
            const mus = await Music.findByIdAndRemove(music[i]._id)
        }  
    }
    res.statusCode = "200"
    res.setHeader('Content-Type','application/json')
    res.json(`Album with id ${req.params.album_id} is Successefuly deleted`)
    }catch(err){
        res.send('Error'+ err)
    }
})
module.exports = router