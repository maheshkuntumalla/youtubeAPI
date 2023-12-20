const express = require('express');
const app = express()
const port = 4000
const axios = require('axios')

const apiKey = "AIzaSyAKD-pDo_0r9eVdxapQbnQA47DX1v7TuK0"
const apiUrl = "https://www.googleapis.com/youtube/v3";
const {google} = require('googleapis')

const youtube = google.youtube({
    version: "v3",
   auth: apiKey,
})

// app.use(express.json())

app.get('/hello', (req, res) => {
    res.send("hello world!")
})

app.get('/search', async(req, res, next)=>{
    try {
        const searchQuery = req.query.search_query;
        const url = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;
    
        const response = await axios.get(url);
        const titles = response.data.items.map((item) => item.snippet.title);
    
        res.send(response);
        console.log(titles)
      } catch (err) {
        next(err);
      }
})

app.get("/search-with-googleapis", async (req, res, next) => {
    try {
      const searchQuery = req.query.search_query;
      const response = await youtube.search.list({
        part: "snippet",
        q: searchQuery,
      });
  
      const titles = response.data.items.map((item) => item.snippet.title);
      res.send({titles});
    } catch (err) {
      next(err);
    }
  });



app.listen(port, (err)=>{
    if(!err){
        console.log(`app is running on port ${port}`)
    }
})