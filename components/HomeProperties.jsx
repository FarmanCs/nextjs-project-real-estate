import connectDB from "@/config/database";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import Property from "@/model/Property";
async function HomeProperties() {
  await connectDB();
  const properties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          <h2 className="mb-6 text-3xl font-bold text-blue-500">
            Recent properties{" "}
          </h2>
          {properties.length === 0 ? (
            <p>No data found yet </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="m-auto my-10 max-w-lg px-7">
        <Link
          href={"/properties"}
          className="block rounded-xl bg-black px-7 py-4 text-center text-white hover:bg-gray-700"
        >
          view all properties
        </Link>
      </section>
    </>
  );
}

export default HomeProperties;
