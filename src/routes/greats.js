const express = require('express');
const axios = require('axios');
const router = express.Router();
const dbHandler = require('../lib/dbHandler');

const API_KEY = 'AIzaSyDb4UOb_JALAJdSgumEOWCo2VgyFjZ6Pzk';
const CX = '45f8a628836074563';
const url = "https://www.googleapis.com/customsearch/v1";

// Define the query parameters
const params = {
    q: "great places to eat in Houston 1000 reviews plus",
    cx: CX,
    key: API_KEY,
    num: 10,
        
};

// Construct the query string from the parameters object
const queryString = new URLSearchParams(params).toString();

router.get('/great', async (req, res) => {
  try {
    // Make the HTTP request using Axios
    const response = await axios.get(`${url}?${queryString}`);
    
    // Extract relevant data from the response
    const restaurants = response.data.items.map(item => ({
      name: item.title,
      link: item.link,
      snippet: item.snippet,
    }));
    
    // Render the data into the template
    res.render('components/theGreatest.ejs', { restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'An error occurred while fetching restaurants.' });
  }
});

module.exports = router;
