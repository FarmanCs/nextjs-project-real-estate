import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/database";
import Property from "@/model/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

async function PropertyPage({ params }) {
  const paramsValue = await params;
  await connectDB();
  const propertyDoc = await Property.findById(paramsValue.id).lean();
  const property = convertToSerializableObject(propertyDoc);
  if (!property) {
    return (
      <h2 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h2>
    );
  }
  return (
    <>
      <PropertyHeaderImage image={property?.images?.[0]} />

      <section>
        <div className="container m-auto px-6 py-6">
          <Link
            href="/"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto px-6 py-10">
          <div className="md:grid-cols-70/30 grid w-full grid-cols-1 gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
}

export default PropertyPage;
