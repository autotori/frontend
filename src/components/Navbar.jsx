import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Navbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const navItems = [
        { path: '/', label: 'Etusivu' },
        { path: '/search', label: 'Haku' },
        { path: '/compare', label: 'Vertaa' },
        { path: '/ai-advisor', label: 'Tekoälyneuvoja' },
        { path: '/about', label: 'Tietoa' }
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Autotori" className="h-8 sm:h-10 w-auto" />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                                    ${isActive(item.path)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setMobileOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-80 border-t border-gray-200' : 'max-h-0'
                    }`}
            >
                <div className="px-4 py-3 space-y-1 bg-white">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200
                                ${isActive(item.path)
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
