import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import CarCard from '../components/CarCard';

import { searchCars } from '../api';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1769113528181-1ec33345ba3d?w=1920&q=80&auto=format&fit=crop';

// Car Section Component
const CarSection = ({ title, description, link, scrollRef, scroll, cars, sources, loading }) => (
    <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 sm:mb-8 gap-2 sm:gap-4">
            <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-3">{title === "Electric Cars" ? "Sähköautot" : title === "Hybrid Cars" ? "Hybridiautot" : title === "Family Cars" ? "Perheautot" : title === "Sport Cars" ? "Urheiluautot" : title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2">{description}</p>
                <Link
                    to={link}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-base mt-1"
                >
                    Näytä lisää
                </Link>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                {/* Carousel scroll buttons at top right */}
                <button
                    onClick={() => scroll(scrollRef, 'left')}
                    className="hidden md:inline-flex items-center justify-center bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200"
                    aria-label="Scroll left"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => scroll(scrollRef, 'right')}
                    className="hidden md:inline-flex items-center justify-center bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200"
                    aria-label="Scroll right"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
        <div>
            <div ref={scrollRef} className="flex-1 flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center py-12 sm:py-20">
                        <div className="text-gray-400">Ladataan autoja...</div>
                    </div>
                ) : cars.length > 0 ? (
                    cars.map((car, idx) => (
                        <div key={idx} className="flex-none w-[72vw] sm:w-72 md:w-80 snap-start">
                            <CarCard car={car} source={car.source} />
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center py-12 sm:py-20">
                        <div className="text-gray-400">Ei autoja saatavilla</div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

function Home() {
    const electricScrollRef = useRef(null);
    const hybridScrollRef = useRef(null);
    const familyScrollRef = useRef(null);
    const sportScrollRef = useRef(null);

    const [electricCars, setElectricCars] = useState([]);
    const [hybridCars, setHybridCars] = useState([]);
    const [familyCars, setFamilyCars] = useState([]);
    const [sportCars, setSportCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllCars();
    }, []);

    const fetchAllCars = async () => {
        try {
            setLoading(true);

            // Fetch cars for each category in parallel
            const [electric, hybrid, family, sport] = await Promise.all([
                searchCars({ fuel: 'Sähkö', pageSize: 10 }),
                searchCars({ fuel: 'hybrid', pageSize: 10 }),
                searchCars({ pageSize: 10 }), // Family cars - all types
                searchCars({ pageSize: 10, sort: 'price_desc' }) // Sport cars - high price
            ]);

            setElectricCars(electric.items || []);
            setHybridCars(hybrid.items || []);
            setFamilyCars(family.items || []);
            setSportCars(sport.items || []);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
        } finally {
            setLoading(false);
        }
    };

    const scroll = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = direction === 'left' ? -600 : 600;
            ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="relative h-[75vh] sm:h-[85vh] md:h-screen">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat bg-[center_60%] sm:bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url(${HERO_IMAGE})`,
                    }}
                />

                {/* Hero Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-5 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 max-w-5xl leading-tight">
                        Finland's smartest car aggregator platform
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-12 max-w-3xl leading-relaxed">
                        Search thousands of quality cars from multiple trusted dealers. Find your perfect car with AI-powered recommendations!
                    </p>

                    <Link
                        to="/search"
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-5 text-base sm:text-lg font-semibold text-blue-700 bg-gradient-to-r from-white via-blue-100 to-blue-200 rounded-full hover:from-blue-100 hover:to-blue-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-blue-200"
                    >
                        <span>Explore</span>
                    </Link>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <svg
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white opacity-75"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gradient-to-b from-white via-gray-50 to-white py-12 sm:py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-14 md:mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                            Why Choose Autotori?
                        </h2>
                        <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience the most comprehensive and intelligent car search platform in Finland
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {/* Multiple Sources Card */}
                        <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    Multiple Sources
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    Search across <span className="font-semibold text-gray-800">Kamux, Autokeskus, and Saka</span> all in one place. Thousands of cars at your fingertips.
                                </p>
                                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                                </div>
                            </div>
                        </div>

                        {/* AI Recommendations Card */}
                        <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                                    Tekoälyn suositukset
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    Get <span className="font-semibold text-gray-800">personalized suggestions</span> based on your budget, needs, and driving habits with our AI advisor.
                                </p>
                                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                                </div>
                            </div>
                        </div>

                        {/* Compare Cars Card */}
                        <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200 hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                                    Vertaa autoja
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    <span className="font-semibold text-gray-800">Side-by-side comparison</span> of specs, prices, and features. Make informed decisions with detailed comparisons.
                                </p>
                                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 sm:py-16 md:py-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-5xl mx-auto text-center px-4">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                        Ready to find your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">dream car?</span>
                    </h2>

                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                        Start your search now and discover the perfect vehicle for your needs. Join thousands of satisfied car buyers!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            to="/search"
                            className="group relative px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-5 bg-white text-blue-600 text-base sm:text-lg font-bold rounded-full hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 inline-flex items-center"
                        >
                            <span>Aloita haku</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>

                        <Link
                            to="/ai-advisor"
                            className="group px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-5 bg-transparent text-white text-base sm:text-lg font-bold rounded-full hover:bg-white/10 transition-all border-2 sm:border-3 border-white backdrop-blur-sm inline-flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Kokeile AI-neuvojaa</span>
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-100">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium">Tuhansien luottama</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="text-sm font-medium">100% ilmainen & turvallinen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-sm font-medium">Välittömät tulokset</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Car Showcase Section */}
            <div className="bg-gray-50 py-10 sm:py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Feed */}
                        <div className="flex-1 min-w-0">
                            <CarSection
                                title="Electric Cars"
                                description="Eco-friendly and efficient vehicles for the future"
                                link="/search?fuel=electric"
                                scrollRef={electricScrollRef}
                                scroll={scroll}
                                cars={electricCars}
                                loading={loading}
                            />
                            <CarSection
                                title="Hybrid Cars"
                                description="Best of both worlds - efficiency meets performance"
                                link="/search?fuel=hybrid"
                                scrollRef={hybridScrollRef}
                                scroll={scroll}
                                cars={hybridCars}
                                loading={loading}
                            />
                            <CarSection
                                title="Family Cars"
                                description="Spacious, comfortable, and perfect for adventures"
                                link="/search"
                                scrollRef={familyScrollRef}
                                scroll={scroll}
                                cars={familyCars}
                                loading={loading}
                            />
                            <CarSection
                                title="Sport Cars"
                                description="Unleash the power - performance and style combined"
                                link="/search"
                                scrollRef={sportScrollRef}
                                scroll={scroll}
                                cars={sportCars}
                                loading={loading}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-10 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
                        <div>
                            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2">1000+</div>
                            <div className="text-blue-200 text-xs sm:text-sm md:text-lg">Laadukkaat autot</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2">100%</div>
                            <div className="text-blue-200 text-xs sm:text-sm md:text-lg">Ilmainen käyttää</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2">24/7</div>
                            <div className="text-blue-200 text-xs sm:text-sm md:text-lg">Saatavilla</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
