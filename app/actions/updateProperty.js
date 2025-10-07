"use server";

import connectDB from "@/config/database";
import Property from "@/model/Property";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId, formData) {
  try {
    await connectDB();

    const userSession = await getSessionUser();
    if (!userSession || !userSession.userId) {
      throw new Error("User ID is required");
    }

    const { userId } = userSession;

    //find the property with the passed id
    const existingProperty = await Property.findById(propertyId);
    // check weather the property belong to the login user or not
    if (existingProperty.owner.toString() !== userId) {
      throw new Error("Unauthorized to edit this property data");
    }

    const propertyData = {
      owner: userId,
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: formData.getAll("amenities"),
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
    };
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      propertyData,
    );

    //revalidate the data
    revalidatePath("/", "layout");

    redirect(`/properties/${updatedProperty._id}`);
  } catch (error) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("something went wrong:", error);
    throw error;
  }
}

export default updateProperty;
