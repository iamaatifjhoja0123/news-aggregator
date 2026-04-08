import NewsCard from './NewsCard';

const NewsGrid = ({ articles, loading }) => {
  
  // Skeleton Loader State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 animate-pulse">
            <div className="w-full h-52 bg-slate-200 rounded-xl mb-5"></div>
            <div className="h-5 bg-slate-200 rounded-md w-full mb-3"></div>
            <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-5"></div>
            <div className="h-4 bg-slate-100 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-slate-100 rounded-md w-5/6 mb-6"></div>
            <div className="h-12 bg-slate-200 rounded-xl w-full mt-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-2xl font-semibold text-slate-700">No articles found</p>
        <p className="text-slate-500 mt-2">Please try another news source.</p>
      </div>
    );
  }

  // Actual News Grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsGrid;