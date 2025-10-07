"use client";
import deleteProperty from "@/app/actions/deleteProperty";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

function ProfileProperties({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);

  async function handleDeleteProperty(propertyId) {
    const confirm = window.confirm("Are you sure to delete this property");
    if (!confirm) {
      throw new Warrn("Deleting this property was cancelled");
    }
    await deleteProperty(propertyId);

    //now update the property list
    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId,
    );
    setProperties(updatedProperties);

    toast.success("Delete the property successfully");
  }

  return properties.map((property) => (
    <div key={property._id} className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property?.images[0]}
          width={1000}
          height={200}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city},{" "}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <a
          href={`/properties/${property._id}/edit`}
          className="mr-2 rounded-md bg-blue-500 px-3 py-3 text-white hover:bg-blue-600"
        >
          Edit
        </a>
        <button
          className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
}

export default ProfileProperties;
