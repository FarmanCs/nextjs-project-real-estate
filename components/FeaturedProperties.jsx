import connectDB from "@/config/database";
import Property from "@/model/Property";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

async function FeaturedProperties() {
  await connectDB();
  const properties = await Property.find({ is_featured: true }).lean();
  return properties.length > 0 ? (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl m-auto lg:container">
        <h2 className="mb-6 bg-blue-500 text-center text-3xl font-bold">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
}

export default FeaturedProperties;
