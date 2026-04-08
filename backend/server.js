const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Development mein sabhi origins allow karte hain. 
// Baad mein jab aap isko AWS par host karke apni domain (jaise tajfood.nirotechs.com) 
// se connect karenge, tab origin ko strict kar sakte hain security ke liye.
app.use(cors()); 
app.use(express.json());

// Basic health-check route
app.get('/', (req, res) => {
    res.send('News Aggregator Backend is Running!');
});

// Main Route: Fetch News from external API
// Frontend se request aayegi jaise: http://localhost:5000/api/news?source=al-jazeera-english
app.get('/api/news', async (req, res) => {
    try {
        const source = req.query.source || 'cnn'; // Default source CNN rakhte hain
        const apiKey = process.env.NEWS_API_KEY;
        
        // NewsAPI endpoint URL
        const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
        
        // Axios se API call
        const response = await axios.get(url);
        
        // Frontend ko sirf articles ka data bhejte hain
        res.json({
            success: true,
            articles: response.data.articles
        });

    } catch (error) {
        console.error('API Fetching Error:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'News fetch karne mein error aayi, please try again later.' 
        });
    }
});

// Server Start karna
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});