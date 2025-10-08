"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/model/Property";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function addProperty(formData) {
  try {
    await connectDB();

    const userSession = await getSessionUser();
    if (!userSession || !userSession.userId) {
      throw new Error("User ID is required");
    }

    const { userId } = userSession;

    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((image) => image !== "");

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
      amenities,
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

    const imageUrls = [];

    console.log(` Uploading ${images.length} images...`);

    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-nextjs-project",
        },
      );

      imageUrls.push(result.secure_url);
    }

    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath("/", "layout");

    redirect(`/properties/${newProperty._id}`);
  } catch (error) {
    //  FIX — allow Next.js redirect to happen normally
    if (
      error.message === "NEXT_REDIRECT" ||
      error.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error(" Error in addProperty:", error);
    throw new Error(`Failed to add property: ${error.message}`);
  }
}

export default addProperty;
