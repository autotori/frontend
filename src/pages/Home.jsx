import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { searchCars } from '../api';

// Car Section Component
const CarSection = ({ title, description, link, scrollRef, scroll, cars, sources, loading }) => (
    <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-lg text-gray-600">{description}</p>
            </div>
            <Link to={link} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group">
                <span>View All</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </div>
        <div className="flex items-center gap-4">
            <button
                onClick={() => scroll(scrollRef, 'left')}
                className="flex-shrink-0 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200"
                aria-label="Scroll left"
            >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div ref={scrollRef} className="flex-1 flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth scroll-pl-0">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center py-20">
                        <div className="text-gray-400">Loading cars...</div>
                    </div>
                ) : cars.length > 0 ? (
                    cars.map((car, idx) => (
                        <div key={idx} className="flex-none w-80 snap-start">
                            <CarCard car={car} source={car.source} />
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center py-20">
                        <div className="text-gray-400">No cars available</div>
                    </div>
                )}
            </div>

            <button
                onClick={() => scroll(scrollRef, 'right')}
                className="flex-shrink-0 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200"
                aria-label="Scroll right"
            >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
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

            console.log('Electric response:', electric);
            console.log('Hybrid response:', hybrid);
            console.log('Family response:', family);
            console.log('Sport response:', sport);

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
            <div className="relative h-screen">
                {/* Background Image Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070')",
                    }}
                />

                {/* Hero Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-5xl leading-tight">
                        Finland's smartest car aggregator platform
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl">
                        Search thousands of quality cars from multiple trusted dealers. Find your perfect car with AI-powered recommendations!
                    </p>

                    <Link
                        to="/search"
                        className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        <span>Explore</span>
                    </Link>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <svg
                            className="w-8 h-8 text-white opacity-75"
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
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Autotori?
                        </h2>
                        <p className="text-xl text-gray-600">
                            The most comprehensive car search platform in Finland
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Multiple Sources
                            </h3>
                            <p className="text-gray-700">
                                Search across Kamux, Autokeskus, and Saka all in one place. Thousands of cars at your fingertips.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                AI Recommendations
                            </h3>
                            <p className="text-gray-700">
                                Get personalized car suggestions based on your budget, needs, and driving habits with our AI advisor.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Real-time Updates
                            </h3>
                            <p className="text-gray-700">
                                Always up-to-date listings. We continuously sync with dealers to show you the latest available cars.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Ready to find your dream car?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Start your search now and discover the perfect vehicle for your needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/search"
                            className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Start Searching
                        </Link>
                        <Link
                            to="/ai-advisor"
                            className="px-10 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-gray-50 transition-colors border-2 border-blue-600"
                        >
                            Try AI Advisor
                        </Link>
                    </div>
                </div>
            </div>

            {/* Car Showcase Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">1000+</div>
                            <div className="text-blue-200 text-lg">Quality Cars</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">100%</div>
                            <div className="text-blue-200 text-lg">Free to Use</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">24/7</div>
                            <div className="text-blue-200 text-lg">Available</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
