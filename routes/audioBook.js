const express = require("express");
const AudioBook = require("../models/audioBook");
const router = express.Router();

/*  
    localhost:3000/AudioBook
    shows all the list of Audiobookin the database
*/
router.get("/", async (req, res) => {
  try {
    const posts = await AudioBook.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    Add a new Audiobookto for a new content creators
*/
router.post("/", async (req, res) => {
  const uploadingAudiobook = new AudioBook(req.body);

  try {
    // console.log(req.body)
    const addAudiobook = await uploadingAudiobook.save();
    res.json(addAudiobook);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    Add a new Audiobookepisode
*/
router.post("/:chapter_id", async (req, res) => {
  try {
    const data = {
      chapter_name: req.body.chapter_name,
      chapter_audio: req.body.chapter_audio,
      chapter_category: req.body.chapter_category,
      chapter_length: req.body.chapter_length,
      chapter_description: req.body.chapter_description,
      chapter_released_date: req.body.chapter_released_date,
    };

    const posts = await AudioBook.findOneAndUpdate(
      { _id: req.params.chapter_id },
      { $push: { chapters: data } }
    );

    // res.send("chapter Inserted Successfully");
    res.json(posts);
    // console.log("TEST")
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    search a AudioBook name using content creater name
*/
router.get("/:audiobook_title", async (req, res) => {
  try {
    const result = await AudioBook.find({ _id: req.params.audiobook_title });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    delete a Audiobookby AudiobookID
*/
router.delete("/:chapterId", async (req, res) => {
  try {
    const deleteAudiobook = await AudioBook.remove({
      _id: req.params.chapterId,
    });
    res.json(deleteAudiobook);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    Edit Audiobookby AudiobookID
*/
router.patch("/:chapter_id", async (req, res) => {
  try {
    const edit_chapter = await AudioBook.findByIdAndUpdate(
      { _id: req.params.podcast_id },
      { $set: req.body },
      { new: true }
    );
    res.json(edit_chapter);
  } catch (error) {
    res.json({ message: error });
  }
});

/*
    If the content creator want to expand his content to diffrent category
*/
router.put("/:audiobook_id", async (req, res) => {
  try {
    const edit_chapter = await AudioBook.findByIdAndUpdate(
      { _id: req.params.podcast_id },
      { $push: req.body },
      { new: true }
    );
    res.json(edit_chapter);
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = router;
