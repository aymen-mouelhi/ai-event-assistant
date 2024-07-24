/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */

import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { BufferMemory } from "langchain/memory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { llm, prompt } from "../../../lib/llm";
import {
  fetchMessages,
  getRateLimit,
  resetRateLimit,
  saveMessage,
  updateRateLimit,
} from "../../utils/services";
import { supabase } from "../../utils/supabaseClient";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";

interface ChatComponentProps {
  selectedConversation: any;
  setAlertMessage: (message: string | null) => void;
  alertMessage: string | null;
  setMessageCount: (count: number) => void;
  messageCount: number;
  setMessages: (messages: any[]) => void;
  messages: any[];
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  selectedConversation,
  setAlertMessage,
  alertMessage,
  setMessageCount,
  messageCount,
  setMessages,
  messages = [],
}) => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const memory = new BufferMemory();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedConversation) {
        const data = await fetchMessages(selectedConversation.id);
        setMessages(data);
        memory.clear();
        for (const message of data) {
          const MessageClass =
            message.role === "user" ? HumanMessage : AIMessage;
          await memory.chatHistory.addMessage(
            new MessageClass(message.content)
          );
        }
      }
    };
    fetchData();
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

    if (!(await handleRateLimit(session.user.id))) return;
    if (!selectedConversation) {
      setAlertMessage("Please select a conversation first.");
      return;
    }

    const userMessage = createUserMessage(
      input,
      selectedConversation.id,
      session.user.id
    );
    await processUserMessage(userMessage);
    await processBotResponse(input, selectedConversation.id, session.user.id);

    setInput("");
  };

  const handleRateLimit = async (userId: string) => {
    const rateLimit = await getRateLimit(userId);
    const currentTime = new Date();
    if (rateLimit && currentTime < new Date(rateLimit.resetTime)) {
      if (rateLimit.messageCount >= 50) {
        setAlertMessage("Message limit reached. Please wait for 3 hours.");
        return false;
      }
    } else {
      await resetRateLimit(userId);
      setMessageCount(0);
    }
    return true;
  };

  const createUserMessage = (
    content: string,
    conversationId: string,
    userId: string
  ) => ({
    id: uuidv4(),
    content,
    role: "user",
    conversation_id: conversationId,
    user_id: userId,
    created_at: new Date().toISOString(),
  });

  const processUserMessage = async (message: any) => {
    setMessages([...messages, message]);
    // @ts-ignore
    setMessageCount((prevCount: number) => prevCount + 1);
    await updateRateLimit(message.user_id, messageCount + 1);
    await saveMessage(message);
  };

  const processBotResponse = async (
    input: string,
    conversationId: string,
    userId: string
  ) => {
    const formattedPrompt = await prompt.format({ input });
    const stream = await llm.stream([
      { type: "assistant", content: formattedPrompt },
    ]);
    let botMessage = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      conversation_id: conversationId,
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    for await (const chunk of stream) {
      botMessage.content += chunk.content;
      updateMessages(botMessage);
    }

    await saveMessage(botMessage);
  };

  const updateMessages = (message: any) => {
    // @ts-ignore
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (msg) => msg.id !== message.id
      );
      return [...updatedMessages, { ...message }];
    });
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-700 p-4 relative">
      <MessageList messages={messages} alertMessage={alertMessage} />
      <MessageInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatComponent;
