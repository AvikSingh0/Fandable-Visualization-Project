const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mediaModel = require('./db/models/post')
const axios = require('axios');


const PORT = process.env.PORT || 8080

console.log("Process port", PORT);
const app = express();

// Import Reddit schema


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



const postRoutes = require('./routes/posts')
const redditRoutes = require('./routes/reddit')
const youtubeRoutes = require('./routes/youtube')

// ######### ROUTES #########
app.use('/api/posts', postRoutes)
app.use('/api/GetRedditData', redditRoutes.router)
app.use('/api/GetYoutubeData', youtubeRoutes.router)






app.post("/api/getPostData", async (req, res) => {
  try {
    const t = req.body.time;
    const RedditTitles = await redditRoutes.getRedditSearchTitles('Affordable Childcare', 10, t)
    const RedditPosts = RedditTitles.map(title => {
      return new mediaModel({ text: title.title, source: 'reddit' });
    });
    const YoutubePosts = await youtubeRoutes.getYoutubeSearchTitles('Affordable Childcare', 10)
    const YoutubeTitles = YoutubePosts.map(title => {
      return new mediaModel({ text: title, source: 'youtube' });
    });

    const posts = RedditPosts.concat(YoutubeTitles);

    const result = await Promise.all(posts.map(post => {
      return mediaModel.findOneAndUpdate(
        { text: post.text },
        post,
        { upsert: true, new: true }
      ).catch(err => {
        if (err.code === 11000) {
          // ignore duplicate key error
          console.log('Duplicate key error');
          return null;
        }
        throw err;
      });
    }));
    const addedPosts = result.filter(post => post !== null);
    const addedTitles = addedPosts.map(post => post.text);
    res.status(201).json({
      titles: addedTitles,
      message: 'Posts successfully added',
      count: addedPosts.length
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to Post retrieved data' })
  }
});



app.delete("/api/DropDB", async (req, res) => {
  try {
    const result = await mediaModel.deleteMany({})
    res.status(201).json({
      message: 'Posts successfully deleted',
      count: result.deletedCount
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete posts' })
  }
});
const getPostData = async () => {
  try {
    const RedditTitles = await redditRoutes.getRedditSearchTitles('Affordable Childcare', 10, 'all')
    const RedditPosts = RedditTitles.map(title => {
      return new mediaModel({ text: title.title, source: 'reddit' });
    });
    const YoutubePosts = await youtubeRoutes.getYoutubeSearchTitles('Affordable Childcare', 10)
    const YoutubeTitles = YoutubePosts.map(title => {
      return new mediaModel({ text: title, source: 'youtube' });
    });
    const posts = RedditPosts.concat(YoutubeTitles);

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
    console.log(`Posts successfully added: ${addedPosts.length}`);
  } catch (error) {
    console.error(error);
  }
}

getPostData();
setInterval(getPostData, 60 * 1000 * 60 * 12);

module.exports = app;
