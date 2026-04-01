import { useState } from 'react';

export default function Filters({ filters, onChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
        {/* Source */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Lähde</label>
          <select
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Kaikki lähteet</option>
            <option value="saka">Saka</option>
            <option value="autokeskus">Autokeskus</option>
            <option value="kamux">Kamux</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Järjestä</label>
          <select
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="relevance">Osuvuus</option>
            <option value="price_asc">Hinta: Edullisin ensin</option>
            <option value="price_desc">Hinta: Kallein ensin</option>
            <option value="year_desc">Uusin ensin</option>
            <option value="mileage_asc">Vähiten ajettu</option>
            <option value="mileage_desc">Eniten ajettu</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Minimi hinta (€)</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            placeholder="0"
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Max Price (€)</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            placeholder="100000"
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {showAdvanced ? '− Piilota' : '+ Näytä'} Tarkennetut suodattimet
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
          {/* Year Range */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Vähimmäisvuosi</label>
            <input
              type="number"
              value={filters.minYear}
              onChange={(e) => handleChange('minYear', e.target.value)}
              placeholder="2000"
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Enimmäisvuosi</label>
            <input
              type="number"
              value={filters.maxYear}
              onChange={(e) => handleChange('maxYear', e.target.value)}
              placeholder="2024"
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Mileage Range */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Vähimmäiskilometrimäärä</label>
            <input
              type="number"
              value={filters.minMileage}
              onChange={(e) => handleChange('minMileage', e.target.value)}
              placeholder="0"
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Enimmäiskilometrimäärä</label>
            <input
              type="number"
              value={filters.maxMileage}
              onChange={(e) => handleChange('maxMileage', e.target.value)}
              placeholder="200000"
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Polttoainetyyppi</label>
            <input
              type="text"
              value={filters.fuel}
              onChange={(e) => handleChange('fuel', e.target.value)}
              placeholder="Diesel, Bensiini"
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Vaihteisto</label>
            <input
              type="text"
              value={filters.transmission}
              onChange={(e) => handleChange('transmission', e.target.value)}
              placeholder="Automaatti, Manuaali"
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
