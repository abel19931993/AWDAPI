const express = require("express");
const PostPodcast = require("../models/podcast_model");
const router = express.Router();

/*  
    localhost:3000/podcasts
    shows all the list of podcast in the database
*/
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let podcast;
    if(qCategory)
    {
      podcast = await PostPodcast.find({
        category:{
          $in:[qCategory]
        }
      })
    }
    else{
      podcast = await PostPodcast.find();
    }
    
    res.json(podcast);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    Add a new podcast to for a new content creators
*/
router.post("/", async (req, res) => {
  const uploadingPodcast = new PostPodcast(req.body);

  try {
    // console.log(req.body)
    const addPodcast = await uploadingPodcast.save();
    res.json(addPodcast);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    Add a new podcast episode
*/
router.post("/:episode_id", async (req, res) => {
  try {
    const data = {
      episode_name: req.body.episode_name,
      episode_audio: req.body.episode_audio,
      episode_category: req.body.episode_category,
      episode_length: req.body.episode_length,
      episode_description: req.body.episode_description,
      episode_released_date: req.body.episode_released_date,
    };

    const posts = await PostPodcast.findOneAndUpdate(
      { _id: req.params.episode_id },
      { $push: { episodes: data } }
    );

    // res.send("Episode Inserted Successfully");
    res.json(posts);
    // console.log("TEST")
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    search a podcast name using content creater name
*/
router.get("/:podcast_id", async (req, res) => {
  try {
    const result = await PostPodcast.findById({ _id: req.params.podcast_id });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/catagory",async (req,res)=>{
  const Category = req.query.category;
  try{
   const result  =await PostPodcast.find({
    category:{
      $in:[Category],
    }

   })
   res.json("Selam new")
  }catch (error){
   res.json({message:error})
  }
})
/*
    delete a podcast by podcast ID
*/
router.delete("/:podcastId", async (req, res) => {
  try {
    const deletePodcast = await PostPodcast.remove({
      _id: req.params.podcastId,
    });
    res.json(deletePodcast);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    Edit podcast by podcast ID
*/
router.patch("/:podcast_id", async (req, res) => {
  try {
    const edit_episode = await PostPodcast.findByIdAndUpdate(
      { _id: req.params.podcast_id },
      { $set: req.body },
      { new: true }
    );
    res.json(edit_episode);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    If the content creator want to expand his content to diffrent category
*/
router.put("/:podcast_id", async (req, res) => {
  try {
    const edit_episode = await PostPodcast.findByIdAndUpdate(
      { _id: req.params.podcast_id },
      { $push: req.body },
      { new: true }
    );
    res.json(edit_episode);
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = router;