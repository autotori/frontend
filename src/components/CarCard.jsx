function CarCard({ car, source }) {
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

    const getSourceColor = (sourceName) => {
        const colors = {
            saka: 'bg-gradient-to-r from-orange-600 to-orange-700',
            autokeskus: 'bg-gradient-to-r from-blue-600 to-blue-700',
            kamux: 'bg-gradient-to-r from-green-600 to-green-700'
        };
        return colors[sourceName?.toLowerCase()] || 'bg-gradient-to-r from-gray-600 to-gray-700';
    };

    // Determine the image URL and title
    const imageUrl = car.image || car.thumbnailUrl;
    const title = car.name || car.title || `${car.make || ''} ${car.model || ''}`.trim() || 'Untitled';

    // Determine source text and color
    const sourceText = source || car.source;
    const sourceColor = getSourceColor(sourceText);

    // Determine price
    const price = car.price || formatPrice(car.priceEur);

    // Determine year and mileage
    const year = car.year;
    const mileage = car.km || formatMileage(car.mileageKm);

    // Determine link
    const link = car.listingUrl || '#';
    const isExternal = car.listingUrl && car.listingUrl.startsWith('http');

    const cardContent = (
        <>
            <div className="relative h-56 overflow-hidden bg-gray-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('bg-gray-200');
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                            <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
                {sourceText && (
                    <div className={`absolute top-4 right-4 ${sourceColor} text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg`}>
                        {sourceText}
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="text-3xl font-bold text-white drop-shadow-lg">
                        {price}
                    </div>
                </div>
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
                    {title}
                </h4>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    {year && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium">{year}</span>
                        </div>
                    )}
                    {mileage && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-sm font-medium">{mileage}</span>
                        </div>
                    )}
                    {car.fuel && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <span className="text-sm font-medium capitalize">{car.fuel}</span>
                        </div>
                    )}
                    {car.transmission && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm font-medium capitalize">{car.transmission}</span>
                        </div>
                    )}
                    {car.power && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-sm font-medium">{car.power}</span>
                        </div>
                    )}
                </div>

                {car.location && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-3 pt-3 border-t border-gray-100">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{car.location}</span>
                    </div>
                )}
            </div>
        </>
    );

    if (isExternal) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-blue-200"
            >
                {cardContent}
            </a>
        );
    }

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-blue-200">
            {cardContent}
        </div>
    );
}

export default CarCard;
