"use server";

import Message from "@/model/Message";
import getSessionUser from "@/utils/getSessionUser";

async function deleteMessage(messageId) {
  const { userId } = await getSessionUser();
  if (!userId) {
    throw new Error("Usesr ID is required  ");
  }

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("No Message found for this Id");
  }

  //check for the property belong to that user or not
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized to take thia action");
  }

  await message.deleteOne();

  revalidatePath("/messages", "page");
}

export default deleteMessage;
