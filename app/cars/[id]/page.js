import Image from "next/image";
import { notFound } from "next/navigation";
import { getCarById } from "@/lib/cars";
import InquiryForm from "@/components/InquiryForm";

export default async function CarDetailPage({ params }) {
  const car = await getCarById(params.id);
  if (!car) notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      <div className="relative aspect-[4/3] bg-steel2 rounded-sm overflow-hidden">
        <Image src={car.image} alt={car.name} fill className="object-cover" />
        <span className="absolute top-3 left-3 bg-charcoal/80 text-ignition text-xs port-tag px-2 py-1 rounded-sm">
          {car.origin_port}
        </span>
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold">{car.name}</h1>
        <p className="text-ignition font-mono text-2xl mt-2">
          ${car.price.toLocaleString()}
        </p>
        <p className="text-silver mt-4">{car.description}</p>

        <dl className="grid grid-cols-2 gap-4 mt-8 text-sm font-mono">
          <Spec label="Year" value={car.year} />
          <Spec
            label="Mileage"
            value={car.mileage === 0 ? "New" : `${car.mileage.toLocaleString()} km`}
          />
          <Spec label="Fuel" value={car.fuel} />
          <Spec label="Transmission" value={car.transmission} />
        </dl>

        <div className="mt-10">
          <h2 className="font-display font-bold text-lg mb-3">Request a quote</h2>
          <InquiryForm carId={car.id} carName={car.name} />
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div className="border border-steel2 rounded-sm p-3">
      <dt className="text-silver text-xs mb-1">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
