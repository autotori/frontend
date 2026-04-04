import CarCard from './CarCard';

export default function CarGrid({ listings, compareUrls = [], maxCompare = 3, onToggleCompare }) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
      {listings.map((car, index) => (
        (() => {
          const listingUrl = car?.listingUrl ? String(car.listingUrl).trim() : '';
          const isCompared = Boolean(listingUrl) && compareUrls.includes(listingUrl);
          const canAddCompare = isCompared || compareUrls.length < maxCompare;

          return (
        <CarCard
          key={`${car.source}-${car.sourceListingId || index}`}
          car={car}
          source={car.source}
          isCompared={isCompared}
          canAddCompare={canAddCompare}
          onToggleCompare={onToggleCompare}
        />
          );
        })()
      ))}
    </div>
  );
}
