"use server";

import connectDB from "@/config/database";
import Message from "@/model/Message";
import getSessionUser from "@/utils/getSessionUser";

async function getUnreadMessageCount() {
  await connectDB();

  const { userId } = await getSessionUser();
  if (!userId) {
    return { error: "User ID is required" };
  }

  const countUnreadMessages = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { countUnreadMessages };
}

export default getUnreadMessageCount;
