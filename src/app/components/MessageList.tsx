/* eslint-disable @next/next/no-img-element */

import React from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  role: string;
}

interface MessageListProps {
  messages: Message[];
  alertMessage: string | null;
}

const MessageList: React.FC<MessageListProps> = ({
  messages = [],
  alertMessage,
}) => {
  return (
    <div
      className="flex-grow p-4 overflow-auto"
      style={{ maxHeight: "calc(100vh - 12rem)" }}
    >
      {alertMessage && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">
          {alertMessage}
        </div>
      )}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-2 flex items-start ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <img
              src="/images/avatar.png"
              alt="Assistant Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <span
            className={`inline-block p-2 ${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500"
            } rounded`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
