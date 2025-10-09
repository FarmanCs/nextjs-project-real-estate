"use client";

import deleteMessage from "@/app/actions/deleteMessage";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import { useState } from "react";
import { toast } from "react-toastify";

function MessageCard({ message }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  async function handleReadClick() {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    toast.success(`Marked is ${read ? "read" : "new"}`);
  }

  async function handleDeleteClick() {
    await deleteMessage(message._id);
    setIsDeleted(true);
    toast.success(`Message deleted`);
  }
  if (isDeleted) {
    <p>Delete message</p>;
  }
  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
      {!isRead && (
        <div className="rounded- absolute top-2 right-2 rounded-md bg-yellow-500 px-2 py-1 text-white">
          new
        </div>
      )}
      <h2 className="mb-4 text-xl">
        <span className="font-bold">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>{" "}
        <li>
          <strong>Received</strong>{" "}
          {/* {new Date(message.createdAt).toLocaleDateString()} */}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 rounded-md bg-blue-500 px-3 py-1 text-white"
      >
        {isRead ? "Mark is New" : "Mark is Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white"
      >
        Delete
      </button>
    </div>
  );
}

export default MessageCard;
