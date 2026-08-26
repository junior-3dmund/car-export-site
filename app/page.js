import SearchBar from "@/components/SearchBar";
import CarCard from "@/components/CarCard";
import { getCars } from "@/lib/cars";
import { Suspense } from "react";

export default async function HomePage() {
  const cars = (await getCars()).slice(0, 3);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p className="port-tag text-ignition text-sm mb-4">DXB → WORLDWIDE</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] max-w-3xl">
          Buy the car. We handle the ocean in between.
        </h1>
        <p className="text-silver mt-5 max-w-xl">
          Quality and affordable car from Asia. Let us be your number one automobile delearship
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-12 w-full max-w-xl rounded-sm bg-steel/60" />}>
            <SearchBar />
          </Suspense>
        </div>
        <div className="route-line mt-12 max-w-3xl" />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">Featured inventory</h2>
          <a href="/cars" className="text-ignition text-sm hover:underline">
            View all →
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}
