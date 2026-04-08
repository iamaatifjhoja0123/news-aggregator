import { Globe } from 'lucide-react';

const Navbar = ({ sources, selectedSource, setSelectedSource }) => {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 overflow-x-auto no-scrollbar">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 mr-8">
            <Globe className="h-7 w-7 text-indigo-600" />
            <span className="font-extrabold text-xl tracking-tight text-slate-900">Nexus<span className="text-indigo-600">News</span></span>
          </div>

          {/* Source Buttons */}
          <div className="flex space-x-3">
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
                  selectedSource === source.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 transform scale-105' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {source.name}
              </button>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;