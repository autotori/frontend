export default function CarGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {listings.map((car, index) => (
        <CarCard key={`${car.source}-${car.sourceListingId || index}`} car={car} />
      ))}
    </div>
  );
}

function CarCard({ car }) {
  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return new Intl.NumberFormat('en-FI', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (km) => {
    if (!km) return 'N/A';
    return new Intl.NumberFormat('en-FI').format(km) + ' km';
  };

  const getSourceColor = (source) => {
    const colors = {
      saka: 'bg-blue-100 text-blue-800',
      autokeskus: 'bg-green-100 text-green-800',
      kamux: 'bg-purple-100 text-purple-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  return (
    <a
      href={car.listingUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {car.thumbnailUrl ? (
          <img
            src={car.thumbnailUrl}
            alt={car.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {/* Source Badge */}
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${getSourceColor(car.source)}`}>
          {car.source}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {car.title || `${car.make || ''} ${car.model || ''}`.trim() || 'Untitled'}
        </h3>

        {/* Price */}
        <p className="text-2xl font-bold text-blue-600 mb-3">
          {formatPrice(car.priceEur)}
        </p>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-600">
          {car.year && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Year:</span>
              <span>{car.year}</span>
            </div>
          )}
          {car.mileageKm != null && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Mileage:</span>
              <span>{formatMileage(car.mileageKm)}</span>
            </div>
          )}
          {car.fuel && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Fuel:</span>
              <span>{car.fuel}</span>
            </div>
          )}
          {car.transmission && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Transmission:</span>
              <span>{car.transmission}</span>
            </div>
          )}
          {car.location && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Location:</span>
              <span>{car.location}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
