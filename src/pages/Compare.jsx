import { useState } from 'react';
import AdPlaceholder from '../components/AdPlaceholder';

function Compare() {
    const [selectedCars, setSelectedCars] = useState([]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Top Banner Ad */}
            <div className="bg-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AdPlaceholder size="banner" variant="green" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Compare Cars</h2>
                    <p className="text-gray-600">Select up to 4 cars to compare side by side</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <div className="max-w-md mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Car Comparison Tool
                        </h3>
                        <p className="text-gray-600 mb-6">
                            This feature will allow you to compare multiple cars side-by-side,
                            showing specifications, prices, and features.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                            <h4 className="font-semibold text-blue-900 mb-2">Coming Soon:</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Side-by-side comparison view</li>
                                <li>• Price and feature comparison</li>
                                <li>• Technical specifications comparison</li>
                                <li>• Running cost estimates</li>
                                <li>• Save and share comparisons</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Compare;
