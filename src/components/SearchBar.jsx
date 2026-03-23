import { useState } from 'react';

export default function SearchBar({ onSearch, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hae merkin, mallin mukaan..."
          className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors"
        >
          Hae
        </button>
      </div>
    </form>
  );
}
