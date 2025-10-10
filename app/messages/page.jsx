export const dynamic = "force-dynamic";

import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/model/Message";
import "@/model/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import getSessionUser from "@/utils/getSessionUser";
import { redirect } from "next/navigation";

async function MessagesPage() {
  await connectDB();
  const session = await getSessionUser();

  // Handle case when there's no session
  if (!session || !session.userId) {
    redirect("/login"); // or wherever your login page is
  }

  const { userId } = session;

  const readMessage = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessage = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...readMessage, ...unreadMessage].map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc);
    message.sender = convertToSerializeableObject(messageDoc.sender);
    message.property = convertToSerializeableObject(messageDoc.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-8 py-6 shadow-md md:m-0">
          <h2 className="mb-4 text-3xl font-bold">Your Messages</h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard message={message} key={message._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesPage;
