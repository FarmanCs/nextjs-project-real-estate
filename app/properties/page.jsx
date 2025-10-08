export const dynamic = "force-dynamic";

import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/model/Property";
import getSessionUser from "@/utils/getSessionUser";

async function PropertiesPage() {
  await connectDB();

  const userSession = await getSessionUser();

  if (!userSession) {
    return (
      <h2 className="mt-5 text-center text-2xl font-bold">
        User not Logged In
      </h2>
    );
  }
  const { userId } = userSession;

  // const properties = await Property.find({}).lean();
  const properties = await Property.find({ owner: userId }).lean();
  // const properties = await Property.find({
  //   owner: new mongoose.Types.ObjectId(userId),
  // }).lean();
  // console.log("properties:", properties);
  if (!properties) {
    return (
      <h1 className="mt-4 text-center text-2xl">No data found for this User</h1>
    );
  }
  return (
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        {properties?.length === 0 ? (
          <p>No data found yet </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {properties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PropertiesPage;
