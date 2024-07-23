import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { BufferMemory } from "langchain/memory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";
import { llm, prompt } from "../../../lib/llm";
import { supabase } from "../../utils/supabaseClient";

export default function ChatComponent({
  selectedConversation,
  setAlertMessage,
  alertMessage,
  setMessageCount,
  messageCount,
  setMessages,
  messages,
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const memory = new BufferMemory();

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        const response = await fetch(
          `/api/messages?conversationId=${selectedConversation.id}`
        );
        const data = await response.json();
        setMessages(data);

        // Clear existing memory
        memory.clear();

        // Add messages to memory based on their roles
        for (const message of data) {
          if (message.role === "user") {
            await memory.chatHistory.addMessage(
              new HumanMessage(message.content)
            );
          } else if (message.role === "assistant") {
            await memory.chatHistory.addMessage(new AIMessage(message.content));
          }
        }
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const rateLimitResponse = await fetch(
      `/api/rate_limit?userId=${session.user.id}`
    );
    const rateLimit = await rateLimitResponse.json();

    const currentTime = new Date();
    if (rateLimit && currentTime < new Date(rateLimit.resetTime)) {
      if (rateLimit.messageCount >= 50) {
        setAlertMessage("Message limit reached. Please wait for 3 hours.");
        return;
      }
    } else {
      await fetch("/api/rate_limit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: session.user.id,
          message_count: 0,
          reset_time: new Date(currentTime.getTime() + 3 * 60 * 60 * 1000),
        }),
      });
      setMessageCount(0);
    }

    if (!selectedConversation) {
      setAlertMessage("Please select a conversation first.");
      return;
    }

    const userMessage = {
      id: uuidv4(),
      content: input,
      role: "user",
      conversation_id: selectedConversation.id,
      user_id: session.user.id,
      created_at: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);

    setMessageCount((prevCount) => prevCount + 1);
    await fetch("/api/rate_limit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: session.user.id,
        message_count: messageCount + 1,
      }),
    });

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userMessage),
    });

    const formattedPrompt = await prompt.format({
      input: input,
    });

    const stream = await llm.stream([
      {
        type: "assistant",
        content: formattedPrompt,
      },
    ]);

    let botMessage = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      conversation_id: selectedConversation.id,
      user_id: session.user.id,
      created_at: new Date().toISOString(),
    };

    for await (const chunk of stream) {
      botMessage.content += chunk.content;
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter(
          (msg) => msg.id !== botMessage.id
        );
        return [...updatedMessages, { ...botMessage }];
      });
    }

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(botMessage),
    });

    setInput("");
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-700 p-4 relative">
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
      <div className="absolute bottom-0 w-full flex items-center p-4 bg-gray-800 mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 bg-gray-900 text-white border border-gray-600 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r"
          onClick={handleSendMessage}
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
