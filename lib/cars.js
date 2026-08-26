import { supabase } from "./supabaseClient";
import sampleCars from "@/data/sample-cars.json";

const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("xxxxx");

// Returns cars, optionally filtered by brand/year/price range/search term.
export async function getCars(filters = {}) {
  if (!hasSupabase) {
    return filterSample(sampleCars, filters);
  }

  let query = supabase.from("cars").select("*").order("created_at", { ascending: false });

  if (filters.brand) query = query.eq("brand", filters.brand);
  if (filters.minYear) query = query.gte("year", filters.minYear);
  if (filters.maxYear) query = query.lte("year", filters.maxYear);
  if (filters.minPrice) query = query.gte("price", filters.minPrice);
  if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
  if (filters.q) query = query.ilike("name", `%${filters.q}%`);

  const { data, error } = await query;
  if (error) {
    console.error("Supabase getCars error:", error.message);
    return [];
  }
  return data;
}

export async function getCarById(id) {
  if (!hasSupabase) {
    return sampleCars.find((c) => String(c.id) === String(id)) || null;
  }

  const { data, error } = await supabase.from("cars").select("*").eq("id", id).single();
  if (error) {
    console.error("Supabase getCarById error:", error.message);
    return null;
  }
  return data;
}

function filterSample(cars, filters) {
  return cars.filter((c) => {
    if (filters.brand && c.brand !== filters.brand) return false;
    if (filters.minYear && c.year < filters.minYear) return false;
    if (filters.maxYear && c.year > filters.maxYear) return false;
    if (filters.minPrice && c.price < filters.minPrice) return false;
    if (filters.maxPrice && c.price > filters.maxPrice) return false;
    if (filters.q && !c.name.toLowerCase().includes(filters.q.toLowerCase())) return false;
    return true;
  });
}
