"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import ChatComponent from "../../components/ChatComponent";
import Header from "../../components/Header";

export default function ChatPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [editableConversationId, setEditableConversationId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        const response = await fetch(`/api/users?email=${session.user.email}`);
        const existingUser = await response.json();

        console.log(`existingUser: ${existingUser}`);

        if (!existingUser && session?.user) {
          await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: session.user.email,
              id: session.user.id,
            }),
          });
        }

        const conversationResponse = await fetch(
          `/api/conversations?userId=${session.user.id}`
        );
        const conversations = await conversationResponse.json();

        if (conversations.length > 0) {
          setConversations(conversations);
          setSelectedConversation(conversations[0]);
        } else {
          const newConversationResponse = await fetch("/api/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              name: "New Conversation",
            }),
          });
          const newConversation = await newConversationResponse.json();
          setConversations([newConversation]);
          setSelectedConversation(newConversation);
        }

        const rateLimitResponse = await fetch(
          `/api/rate_limit?userId=${session.user.id}`
        );
        const rateLimit = await rateLimitResponse.json();

        setMessageCount(rateLimit?.messageCount || 0);
      }
    };
    checkSession();
  }, [router]);

  const handleConversationClick = async (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleNewConversation = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        name: "New Conversation",
      }),
    });

    const newConversation = await response.json();
    setConversations([...conversations, newConversation]);
    setSelectedConversation(newConversation);
    setMessages([]);
  };

  const handleConversationTitleChange = async (conversationId, newName) => {
    await fetch("/api/conversations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        name: newName,
      }),
    });

    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, name: newName }
          : conversation
      )
    );
  };

  const handleTitleDoubleClick = (conversation) => {
    setEditableConversationId(conversation.id);
    setNewTitle(conversation.name);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = async (conversationId) => {
    if (newTitle.trim() === "") return;
    await handleConversationTitleChange(conversationId, newTitle);
    setEditableConversationId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-row flex-grow">
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
                  <span
                    onDoubleClick={() => handleTitleDoubleClick(conversation)}
                  >
                    {conversation.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex flex-col flex-grow bg-gray-700 p-4 relative">
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
