import { useState, useEffect } from 'react';
import { searchCars } from '../api';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import CarGrid from '../components/CarGrid';
import Pagination from '../components/Pagination';
import AdPlaceholder from '../components/AdPlaceholder';

function Search() {
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
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                <div className="mb-4 sm:mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Search Cars</h2>
                    <p className="text-sm sm:text-base text-gray-600">Find your perfect car from multiple sources across Finland</p>
                </div>

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
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Searching...</p>
                    </div>
                )}

                {!loading && results && (
                    <>
                        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div className="text-xs sm:text-sm text-gray-600">
                                Found <span className="font-semibold text-gray-900">{results.total || 0}</span> results
                                {results.query && ` for "${results.query}"`}
                            </div>
                            <div className="text-xs text-gray-400">
                                Page {results.page || 1} of {results.totalPages || 1}
                            </div>
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
                    <div className="text-center py-10 sm:py-16 bg-white rounded-xl shadow-md">
                        <svg className="w-14 h-14 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-1 sm:mb-2">No cars found</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Try adjusting your search criteria or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
