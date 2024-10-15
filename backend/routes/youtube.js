const express = require('express')
const router = express.Router()
const mediaModel = require('../db/models/post')
const axios = require("axios");

//const YOUTUBE_API_KEY = 'AIzaSyBlGMkvsYrbfgUBWxxbDMWcAA';
//const YOUTUBE_API_KEY =  'AIzaSyB2FC6BzWoDnWwCYsxxYXtjKeo' ;
const YOUTUBE_API_KEY = 'AIzaSyAcs1UjA1ssxIsxxXOao'; // Backup key
//const YOUTUBE_API_KEY = 'AIzaSyBI0CTFra2tRcYvrCmGL_tc-shnoxxDQ';
const YOUTUBE_URI = 'https://www.googleapis.com/youtube/v3/search?part=snippet&';


router.get("/", async (req, res) => {
  try {
    const titles = await getYoutubeSearchTitles('Affordable Childcare', 10)
    const posts = titles.map(title => {
      return new mediaModel({ text: title, source: 'youtube' });
    });
    const result = await Promise.all(posts.map(post => {
      return mediaModel.findOneAndUpdate(
        { text: post.text },
        post,
        { upsert: true, new: true }
      ).catch(err => {
        if (err.code === 11000) {
          // ignore duplicate key error
          console('Duplicate key error')
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
async function getYoutubeSearchTitles(searchTerm, limit) {
  try {
    const response = await axios.get(`${YOUTUBE_URI}&key=${YOUTUBE_API_KEY}&maxResults=${limit}&q=${searchTerm}`);
    const videoTitles = response.data.items.map((item) => {
      titleWithDesc = item.snippet.title + " " + item.snippet.description.slice(0, -3);
      return titleWithDesc;
    });
    return videoTitles;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  router: router,
  getYoutubeSearchTitles: getYoutubeSearchTitles
};
