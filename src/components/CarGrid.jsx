import CarCard from './CarCard';

export default function CarGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {listings.map((car, index) => (
        <CarCard
          key={`${car.source}-${car.sourceListingId || index}`}
          car={car}
          source={car.source}
        />
      ))}
    </div>
  );
}
