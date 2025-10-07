import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/model/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

async function PropertyEditPage({ params }) {
  const parmasData = await params;
  await connectDB();

  const propertyDoc = await Property.findById(parmasData.id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not found!
      </h1>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-8 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
}

export default PropertyEditPage;
