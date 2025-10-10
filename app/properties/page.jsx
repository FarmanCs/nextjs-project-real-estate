export const dynamic = "force-dynamic";

import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/model/Property";
import getSessionUser from "@/utils/getSessionUser";

async function PropertiesPage({ searchParams }) {
  const { page = 1, pageSize = 11 } = await searchParams;
  console.log("searchParams:", page, pageSize);
  const { userId } = await getSessionUser();
  await connectDB();
  const skip = (page - 1) * pageSize;
  console.log("SKIP:", skip);

  const totalDoc = await Property.countDocuments({});

  const showPagination = totalDoc > pageSize;

  if (!userId) {
    return (
      <h2 className="mt-5 text-center text-2xl font-bold">
        User not Logged In
      </h2>
    );
  }

  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();
  // const properties = await Property.find({ owner: userId }).lean();

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
      {showPagination && (
        <Pagination
          page={parseInt(page)}
          pageSize={parseInt(pageSize)}
          totalItem={totalDoc}
        />
      )}
    </section>
  );
}

export default PropertiesPage;
