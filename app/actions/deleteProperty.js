"use server";
import Property from "@/model/Property";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyID) {
  const userSession = await getSessionUser();
  if (!userSession || !userSession.userId) {
    throw new Error("Usesr ID is required  ");
  }
  const { userId } = userSession;
  const property = await Property.findById(propertyID);
  if (!property) {
    throw new Error("No property found for this Id");
  }

  //check for the property belong to that user or not
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized to take thia action");
  }

  //now delete the images from the cloudinary...
  const publicIds = await property.images.map((image) => {
    const parse = image.split("/");
    return parse.at(-1).split(".").at(0);
  });

  if (publicIds.length > 0) {
    for (let publicID of publicIds) {
      await cloudinary.uploader.destroy("property-nextjs-project/" + publicID);
    }
  }

  //delete the property
  await property.deleteOne();

  //revalidate the path and update the cashe

  revalidatePath("/", "layout");
}

export default deleteProperty;
