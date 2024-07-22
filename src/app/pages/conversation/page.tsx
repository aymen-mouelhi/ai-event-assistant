import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function ConversationPage() {
  const [message, setMessage] = useState("");
  const user = useAuth();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending message
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
        <h1 className="text-2xl">AI Event Assistant</h1>
        {user && (
          <div className="rounded-full bg-gray-800 p-2">{user.email}</div>
        )}
      </header>
      <div className="flex flex-1">
        <aside className="w-1/4 p-4 bg-gray-800 text-white">
          <h2 className="text-xl">Conversations</h2>
          {/* List conversations */}
        </aside>
        <main className="flex-1 p-4 bg-gray-900 text-white">
          <div className="flex flex-col flex-1">
            <div className="flex-1">{/* Display messages */}</div>
            <form className="flex" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 bg-gray-800 text-white border-none rounded-l-md"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r-md"
              >
                Send
              </button>
            </form>
          </div>
        </main>
      </div>
      <footer className="p-4 bg-gray-800 text-white text-center">
        © 2024 AI Event Assistant. All rights reserved.
      </footer>
    </div>
  );
}
