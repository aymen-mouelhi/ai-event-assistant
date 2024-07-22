/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Header from "../../components/Header";

export default function ChatPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState([
    { id: 1, name: "Conversation 1" },
  ]);
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };
    checkSession();
  }, [router]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header></Header>
      <div className="flex flex-row flex-grow">
        <aside className="w-1/5 bg-gray-800 p-4">
          <h2 className="text-xl mb-4">Chats</h2>
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`p-2 cursor-pointer ${
                  selectedConversation.id === conversation.id
                    ? "bg-gray-700"
                    : "bg-gray-800"
                }`}
                onClick={() => handleConversationClick(conversation)}
              >
                {conversation.name}
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex flex-col flex-grow bg-gray-700 p-4 relative">
          <div className="flex-grow p-4">
            {/* Chat messages will go here */}
          </div>
          <div className="absolute bottom-0 w-full flex items-center p-4 bg-gray-800">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow p-2 bg-gray-900 text-white border border-gray-600 rounded-l"
            />
            <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
