const express = require('express')
const router = express.Router()
const mediaModel = require('../db/models/post')

const mongoose = require('mongoose')


router.get("/", async (req, res) => {
  try {
    const outputs = await mediaModel.find();
    res.status(200).json({
      tasks: outputs.map((outputs) => ({
        id: outputs.id,
        text: outputs.text,
        source: outputs.source
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch data." });
  }
});

router.post("/", async (req, res) => {
  const {text, source = "user"} = req.body;
  console.log("text:", text);
  const post = new mediaModel({
    _id: new mongoose.Types.ObjectId(),
    text,
    source,
  });

  try {
    await post.save().catch((e) => console.log(e));
    res.status(201).json({
      message: "Test post has been added",
      task: { id: post._id, text: text, source: source },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to save." });
  }
});

module.exports = router