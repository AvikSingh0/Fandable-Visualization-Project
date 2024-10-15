const express = require('express')
const router = express.Router()
const mediaModel = require('../db/models/post')
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const t = req.body.time;
    const titles = await getRedditSearchTitles('Affordable Childcare', 10, t)
    const posts = titles.map(title => {
      return new mediaModel({ text: title.title, source: 'reddit' });
    });
    const result = await Promise.all(posts.map(post => {
      return mediaModel.findOneAndUpdate(
        { text: post.text },
        post,
        { upsert: true, new: true }
      ).catch(err => {
        if (err.code === 11000) {
          // ignore duplicate key error
          console.log('Duplicate key error')
          return;
        }
        throw err;
      });
    }));
    const addedPosts = result.filter(post => post !== null);
    res.status(201).json({
      titles: titles,
      message: 'Posts successfully added',
      count: addedPosts.length
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to Post retrieved data' })
  }
});


async function getRedditSearchTitles(searchTerm, limit, time) {
  try {
    const response = await axios.get(`https://www.reddit.com/search.json?q=${searchTerm}&limit=${limit}&t=${time}`);
    const results = response.data.data.children;
    return results.map(result => ({
      title: result.data.title,
    }));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  router: router,
  getRedditSearchTitles: getRedditSearchTitles
};
