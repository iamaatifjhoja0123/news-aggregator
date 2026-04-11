import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import NewsGrid from './components/NewsGrid';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState('al-jazeera-english');

  const newsSources = [
    { id: 'al-jazeera-english', name: 'Al Jazeera' },
    { id: 'the-times-of-india', name: 'Times of India' },
    { id: 'the-washington-post', name: 'Washington Post' },
    { id: 'techcrunch', name: 'TechCrunch' },
    { id: 'bbc-news', name: 'BBC News' }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); 
      try {
        // Node.js backend call 
        const response = await axios.get(`/api/news?source=${selectedSource}`);
        
       
        const validArticles = response.data.articles.filter(
          article => article.title !== '[Removed]' && article.urlToImage
        );
        setArticles(validArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchNews();
  }, [selectedSource]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-200">
      <Navbar 
        sources={newsSources} 
        selectedSource={selectedSource} 
        setSelectedSource={setSelectedSource} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Top Headlines from <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">{newsSources.find(s => s.id === selectedSource)?.name}</span>
          </h1>
          <p className="text-slate-500 mt-3 text-lg">Stay updated with the most important stories around the world.</p>
        </header>

        <NewsGrid articles={articles} loading={loading} />
      </main>
    </div>
  );
}

export default App;