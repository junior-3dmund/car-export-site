import CarCard from "@/components/CarCard";
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

      <form className="grid sm:grid-cols-5 gap-3 mb-10 bg-steel border border-steel2 p-4 rounded-sm">
        <input
          name="q"
          defaultValue={filters.q}
          placeholder="Search model"
          className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm sm:col-span-2"
        />
        <select
          name="brand"
          defaultValue={filters.brand}
          className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm"
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <input
          name="minPrice"
          type="number"
          placeholder="Min price"
          defaultValue={filters.minPrice || ""}
          className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm"
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Max price"
          defaultValue={filters.maxPrice || ""}
          className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm"
        />
        <button className="sm:col-span-5 bg-ignition text-charcoal font-medium rounded-sm py-2 hover:brightness-110 transition">
          Apply filters
        </button>
      </form>

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
