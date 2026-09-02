import CarCard from "@/components/CarCard";
import Filters from "@/components/Filters";
import { getCars } from "@/lib/cars";

export const dynamic = "force-dynamic";

export default async function CarsPage({ searchParams }) {
  const filters = {
    q: searchParams.q || "",
    brand: searchParams.brand || "",
    minYear: searchParams.minYear ? Number(searchParams.minYear) : undefined,
    maxYear: searchParams.maxYear ? Number(searchParams.maxYear) : undefined,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
  };

  const cars = await getCars(filters);
  const brands = [...new Set(cars.map((c) => c.brand))];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Inventory</h1>

      <Filters filters={filters} brands={brands} />

      {cars.length === 0 ? (
        <p className="text-silver">No cars match those filters yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
