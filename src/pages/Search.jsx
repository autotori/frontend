import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCars } from '../api';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import CarGrid from '../components/CarGrid';
import Pagination from '../components/Pagination';
import {
    MAX_COMPARE_CARS,
    clearCompareSelection,
    getCompareSelection,
    getCompareSelectionUrls,
    toggleCompareSelection
} from '../utils/compareSelection';


function Search() {
    const navigate = useNavigate();
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
    const [compareCars, setCompareCars] = useState(() => getCompareSelection());
    const [compareNotice, setCompareNotice] = useState('');

    useEffect(() => {
        performSearch();
    }, [page, filters, query]);

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
        // actual search will run via useEffect when `query` changes
    };

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleToggleCompare = (car) => {
        const result = toggleCompareSelection(car);
        setCompareCars(result.selection);

        if (!result.changed) {
            if (result.reason === 'max-reached') {
                setCompareNotice(`Voit lisätä vertailuun enintään ${MAX_COMPARE_CARS} autoa.`);
            } else if (result.reason === 'missing-url') {
                setCompareNotice('Tätä autoa ei voi lisätä vertailuun ilman ilmoituslinkkiä.');
            }
            return;
        }

        setCompareNotice(result.action === 'added' ? 'Auto lisätty vertailuun.' : 'Auto poistettu vertailusta.');
    };

    const handleClearCompare = () => {
        clearCompareSelection();
        setCompareCars([]);
        setCompareNotice('Vertailulista tyhjennetty.');
    };

    const handleOpenCompare = () => {
        navigate('/compare');
    };

    useEffect(() => {
        if (!compareNotice) return;
        const timer = setTimeout(() => setCompareNotice(''), 2500);
        return () => clearTimeout(timer);
    }, [compareNotice]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                <div className="mb-4 sm:mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Hae autoja</h2>
                    <p className="text-sm sm:text-base text-gray-600">Löydä täydellinen auto useista lähteistä ympäri Suomen</p>
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
                        <p className="font-medium">Virhe: {error}</p>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Haetaan autoja...</p>
                    </div>
                )}

                {!loading && results && (
                    <>
                        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div className="text-xs sm:text-sm text-gray-600">
                                Löytyi <span className="font-semibold text-gray-900">{results.total || 0}</span> autoa
                                {results.query && ` haulla "${results.query}"`}
                            </div>
                            <div className="text-xs text-gray-400">
                                Sivu {results.page || 1} / {results.totalPages || 1}
                            </div>
                        </div>

                        <CarGrid
                            listings={results.items || []}
                            compareUrls={getCompareSelectionUrls()}
                            maxCompare={MAX_COMPARE_CARS}
                            onToggleCompare={handleToggleCompare}
                        />



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
                        <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Ei autoja löytynyt</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Kokeile muuttaa hakua tai suodattimia</p>
                    </div>
                )}
            </div>

            {compareNotice && (
                <div className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg">
                    {compareNotice}
                </div>
            )}

            {compareCars.length > 0 && (
                <div className="fixed inset-x-0 bottom-3 sm:bottom-4 z-40 px-3 sm:px-4">
                    <div className="max-w-7xl mx-auto rounded-2xl border border-blue-200 bg-white/95 backdrop-blur-sm shadow-xl px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between gap-3">
                        <div className="text-xs sm:text-sm text-gray-700">
                            Vertailussa <span className="font-semibold text-gray-900">{compareCars.length}</span> / {MAX_COMPARE_CARS} autoa
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleClearCompare}
                                className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Tyhjennä
                            </button>
                            <button
                                type="button"
                                onClick={handleOpenCompare}
                                disabled={compareCars.length < 2}
                                className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Vertaa nyt
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Search;
