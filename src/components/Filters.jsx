import { useState } from 'react';

export default function Filters({ filters, onChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
          <select
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Sources</option>
            <option value="saka">Saka</option>
            <option value="autokeskus">Autokeskus</option>
            <option value="kamux">Kamux</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="year_desc">Newest First</option>
            <option value="mileage_asc">Lowest Mileage</option>
            <option value="mileage_desc">Highest Mileage</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (€)</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (€)</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            placeholder="100000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {showAdvanced ? '− Hide' : '+ Show'} Advanced Filters
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Year</label>
            <input
              type="number"
              value={filters.minYear}
              onChange={(e) => handleChange('minYear', e.target.value)}
              placeholder="2000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Year</label>
            <input
              type="number"
              value={filters.maxYear}
              onChange={(e) => handleChange('maxYear', e.target.value)}
              placeholder="2024"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Mileage Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Mileage (km)</label>
            <input
              type="number"
              value={filters.minMileage}
              onChange={(e) => handleChange('minMileage', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Mileage (km)</label>
            <input
              type="number"
              value={filters.maxMileage}
              onChange={(e) => handleChange('maxMileage', e.target.value)}
              placeholder="200000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
            <input
              type="text"
              value={filters.fuel}
              onChange={(e) => handleChange('fuel', e.target.value)}
              placeholder="e.g., Diesel, Petrol"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
            <input
              type="text"
              value={filters.transmission}
              onChange={(e) => handleChange('transmission', e.target.value)}
              placeholder="e.g., Automatic, Manual"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
