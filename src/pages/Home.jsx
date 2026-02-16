import { Link } from 'react-router-dom';

function Home() {
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
        </div>
    );
}

export default Home;
