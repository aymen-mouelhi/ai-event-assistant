/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import ChatComponent from "../../components/ChatComponent";
import ChatList from "../../components/ChatList";
import Header from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { useConversations } from "../../hooks/useConversations";

export default function ChatPage() {
  const user = useAuth();
  const [messageCount, setMessageCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const {
    conversations,
    selectedConversation,
    editableConversationId,
    newTitle,
    handleNewConversation,
    handleConversationClick,
    handleTitleDoubleClick,
    handleTitleChange,
    handleTitleBlur,
  } = useConversations(user?.id, setMessageCount);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-row flex-grow">
        <ChatList
          conversations={conversations}
          selectedConversation={selectedConversation}
          editableConversationId={editableConversationId}
          newTitle={newTitle}
          handleConversationClick={handleConversationClick}
          handleTitleDoubleClick={handleTitleDoubleClick}
          handleTitleChange={handleTitleChange}
          handleTitleBlur={handleTitleBlur}
          handleNewConversation={handleNewConversation}
          messageCount={messageCount}
        />
        <main className="flex flex-col flex-grow bg-gray-700 p-4 relative z-10">
          <ChatComponent
            selectedConversation={selectedConversation}
            setAlertMessage={setAlertMessage}
            alertMessage={alertMessage}
            setMessageCount={setMessageCount}
            messageCount={messageCount}
            setMessages={setMessages}
            messages={messages}
          />
        </main>
      </div>
    </div>
  );
}
