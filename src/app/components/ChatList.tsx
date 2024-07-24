/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

interface ChatListProps {
  conversations: any[];
  selectedConversation: any;
  editableConversationId: string | null;
  newTitle: string;
  handleConversationClick: (conversation: any) => void;
  handleTitleDoubleClick: (conversation: any) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: (conversationId: string) => void;
  handleNewConversation: () => void;
  messageCount: number;
}

const ChatList: React.FC<ChatListProps> = ({
  conversations,
  selectedConversation,
  editableConversationId,
  newTitle,
  handleConversationClick,
  handleTitleDoubleClick,
  handleTitleChange,
  handleTitleBlur,
  handleNewConversation,
  messageCount,
}) => {
  return (
    <aside className="min-w-[250px] w-1/5 bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Chats</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNewConversation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <p className="text-sm mb-4">
        Messages sent: {messageCount}/50 (per 3 hours)
      </p>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`p-2 cursor-pointer ${
              selectedConversation?.id === conversation.id
                ? "bg-gray-700"
                : "bg-gray-800"
            }`}
            onClick={() => handleConversationClick(conversation)}
          >
            {editableConversationId === conversation.id ? (
              <input
                type="text"
                value={newTitle}
                onChange={handleTitleChange}
                onBlur={() => handleTitleBlur(conversation.id)}
                className="w-full bg-gray-700 text-white p-1 rounded"
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => handleTitleDoubleClick(conversation)}>
                {conversation.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatList;
