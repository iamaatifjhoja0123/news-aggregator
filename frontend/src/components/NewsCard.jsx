import { ExternalLink } from 'lucide-react';

const NewsCard = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col h-full group">
      
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-slate-100">
        <img 
          src={article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80'} 
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          {formattedDate}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors duration-200">
          {article.title}
        </h2>
        
        <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
          {article.description || "Read the full story to know more details about this breaking news."}
        </p>
        
        {/* Read More Button */}
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center w-full bg-slate-50 hover:bg-indigo-600 text-indigo-700 font-semibold py-3 px-4 rounded-xl border border-indigo-100 transition-all duration-300 group-hover:text-white"
        >
          Read Full Story
          <ExternalLink className="ml-2 w-4 h-4" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;