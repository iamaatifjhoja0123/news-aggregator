const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/news', async (req, res) => {
    try {
        const source = req.query.source || 'cnn';
        
        // --- MULTI-KEY ROTATION LOGIC ---
        // .env se sari keys uthayega aur array banayega
        const allKeys = process.env.NEWS_API_KEY.split(',');
        // Har baar ek random key select karega
        const apiKey = allKeys[Math.floor(Math.random() * allKeys.length)];

        // Al Jazeera fix: Agar source id 'al-jazeera-english' hai toh 'Al Jazeera' search karega
        let searchQuery = source.split('-').join(' ');
        if(source === 'al-jazeera-english') searchQuery = 'Al Jazeera';

        // GNews URL with 'sortby=publishedAt' for latest news
        const url = `https://gnews.io/api/v4/search?q="${searchQuery}"&lang=en&max=12&sortby=publishedAt&apikey=${apiKey}`;
        
        const response = await axios.get(url);
        
        const formattedArticles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.image,
            publishedAt: article.publishedAt
        }));

        res.json({
            success: true,
            articles: formattedArticles,
            usedKeySuffix: apiKey.slice(-4) // Debugging ke liye: key ke aakhri 4 char
        });

    } catch (error) {
        console.error('API Fetching Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            success: false, 
            message: 'News fetch nahi ho payi.' 
        });
    }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));