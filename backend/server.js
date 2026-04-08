const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Basic health-check route
app.get('/', (req, res) => {
    res.send('News Aggregator Backend is Running!');
});

// Main Route: Fetch News using GNews API
app.get('/api/news', async (req, res) => {
    try {
        const source = req.query.source || 'cnn';
        
        // 'al-jazeera-english' ko 'al jazeera english' mein badalna taaki search sahi ho
        const searchQuery = source.split('-').join(' '); 
        
        // AWS server par jo .env banayenge, wahan se yeh key aayegi
        const apiKey = process.env.NEWS_API_KEY; 
        
        // GNews API URL
        const url = `https://gnews.io/api/v4/search?q="${searchQuery}"&lang=en&max=10&apikey=${apiKey}`;
        
        const response = await axios.get(url);
        
        // GNews response mein urlToImage ki jagah image hota hai, isliye map kar rahe hain
        const formattedArticles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.image, // React frontend urlToImage dhundhta hai
            publishedAt: article.publishedAt
        }));

        res.json({
            success: true,
            articles: formattedArticles
        });

    } catch (error) {
        console.error('API Fetching Error:', error.response ? error.response.data : error.message);
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