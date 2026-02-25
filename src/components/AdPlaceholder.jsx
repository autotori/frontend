import { useState } from 'react';

function AdPlaceholder({ size = 'medium', variant = 'default', className = '' }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const sizeClasses = {
        small: 'h-24 w-full',
        medium: 'h-48 w-full',
        large: 'h-64 w-full',
        banner: 'h-32 w-full',
        sidebar: 'h-96 w-full',
        square: 'h-64 w-64',
        card: 'h-80 w-80'
    };

    const variants = {
        default: 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300',
        blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300',
        purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-dashed border-purple-300',
        green: 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-dashed border-green-300',
    };

    return (
        <div className={`${sizeClasses[size]} ${variants[variant]} ${className} rounded-lg relative overflow-hidden group transition-all duration-300 hover:shadow-lg`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <svg
                        className="w-12 h-12 mx-auto mb-3 text-gray-400 group-hover:text-gray-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                    </svg>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Advertisement Space</p>
                    <p className="text-xs text-gray-400">Sponsored Content</p>
                </div>

                {/* Close button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Close ad"
                >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Animated background effect */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
        </div>
    );
}

export default AdPlaceholder;
