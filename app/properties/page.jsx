import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/model/Property";

async function PropertiesPage() {
  await connectDB();
  const properties = await Property.find({}).lean();
  return (
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
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
  );
}

export default PropertiesPage;
