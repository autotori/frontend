import { useState, useEffect } from 'react';
import { searchCars } from './api';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import CarGrid from './components/CarGrid';
import Pagination from './components/Pagination';

function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    source: 'all',
    sort: 'relevance',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    minMileage: '',
    maxMileage: '',
    fuel: '',
    transmission: '',
    location: '',
    make: '',
    model: ''
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    performSearch();
  }, [page, filters]);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        q: query,
        page,
        pageSize,
        ...filters
      };
      
      const data = await searchCars(params);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    performSearch();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">🚗 Autotori</h1>
          <p className="text-sm text-gray-500 mt-1">Search cars from multiple sources</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          onSearch={handleSearch} 
          initialQuery={query}
        />

        <Filters 
          filters={filters} 
          onChange={handleFilterChange} 
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        )}

        {!loading && results && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Found {results.total || 0} results 
              {results.query && ` for "${results.query}"`}
              <span className="ml-2 text-xs text-gray-400">
                (Page {results.page || 1} of {results.totalPages || 1})
              </span>
            </div>

            <CarGrid listings={results.items || []} />

            {results.totalPages > 1 && (
              <Pagination
                currentPage={results.page || 1}
                totalPages={results.totalPages || 1}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {!loading && results && results.items?.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          <p>Aggregating from Saka, Autokeskus, and Kamux</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
