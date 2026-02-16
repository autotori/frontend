import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Search' },
        { path: '/compare', label: 'Compare' },
        { path: '/ai-advisor', label: 'AI Advisor' },
        { path: '/about', label: 'About' }
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">Autotori</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex space-x-1">
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
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
