"use server";
import connectDB from "@/config/database";
import Message from "@/model/Message";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
  await connectDB();

  const { userId } = await getSessionUser();

  if (!userId) {
    return { error: "User ID is required" };
  }

  // Find message in database
  const message = await Message.findById(messageId);

  //check the message is their or noth
  if (!message) {
    throw new Error("message not found");
  }
  //check the owner ship of the message who sent this message
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized, This message is not sent by you");
  }
  message.read = !message.read;
  revalidatePath("/messages", "page");

  await message.save();

  return message.read;
}

export default markMessageAsRead;
