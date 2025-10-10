import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import connectDB from "@/config/database";
import Property from "@/model/Property";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import { convertToSerializeableObject } from "@/utils/convertToObject";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  const { id } = await params;
  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializeableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto px-6 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto px-6 py-10">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
            {/* Main content - takes 2 columns on md and lg screens */}
            <div className="md:col-span-2">
              <PropertyDetails property={property} />
            </div>

            {/* Sidebar - takes 1 column on md and lg screens */}
            <aside className="space-y-6">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};
export default PropertyPage;
