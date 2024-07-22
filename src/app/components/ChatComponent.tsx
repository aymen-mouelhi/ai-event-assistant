"use client";

import { useState } from "react";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
            {msg}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-800 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 mr-2 bg-gray-700 rounded"
        />
        <button onClick={handleSend} className="bg-blue-500 p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
