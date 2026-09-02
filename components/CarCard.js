import Link from "next/link";
import Image from "next/image";

export default function CarCard({ car }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block bg-steel border border-steel2 rounded-sm overflow-hidden hover:border-ignition transition-colors"
    >
      <div className="relative aspect-[4/3] bg-steel2">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-charcoal/80 text-ignition text-xs port-tag px-2 py-1 rounded-sm">
          {car.origin_port}
        </span>
      </div>
      <div className="p-4">
        <p className="font-display font-bold text-base sm:text-lg leading-tight">{car.name}</p>
        <p className="text-silver text-xs sm:text-sm mt-1">
          {car.year} · {car.mileage === 0 ? "New" : `${car.mileage.toLocaleString()} km`} · {car.transmission}
        </p>
        <p className="text-ignition font-mono font-medium mt-3 text-sm sm:text-base">
          GH₵ {car.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
