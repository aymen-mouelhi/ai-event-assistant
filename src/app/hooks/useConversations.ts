/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

export const useConversations = (
  userId: string | undefined,
  setMessageCount: (count: number) => void
) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [editableConversationId, setEditableConversationId] = useState<
    string | null
  >(null);
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) return;

      const conversationResponse = await fetch(
        `/api/conversations?userId=${userId}`
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
            userId,
            name: "New Conversation",
          }),
        });
        const newConversation = await newConversationResponse.json();
        setConversations([newConversation]);
        setSelectedConversation(newConversation);
      }

      const rateLimitResponse = await fetch(`/api/rate_limit?userId=${userId}`);
      const rateLimit = await rateLimitResponse.json();

      setMessageCount(rateLimit?.messageCount || 0);
    };

    fetchConversations();
  }, [userId, setMessageCount]);

  const handleNewConversation = async () => {
    if (!userId) return;

    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        name: "New Conversation",
      }),
    });

    const newConversation = await response.json();
    setConversations((prev) => [...prev, newConversation]);
    setSelectedConversation(newConversation);
  };

  const handleConversationClick = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  const handleConversationTitleChange = async (
    conversationId: string,
    newName: string
  ) => {
    await fetch("/api/conversations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        name: newName,
      }),
    });

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, name: newName }
          : conversation
      )
    );
  };

  const handleTitleDoubleClick = (conversation: any) => {
    setEditableConversationId(conversation.id);
    setNewTitle(conversation.name);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = async (conversationId: string) => {
    if (newTitle.trim() === "") return;
    await handleConversationTitleChange(conversationId, newTitle);
    setEditableConversationId(null);
  };

  return {
    conversations,
    selectedConversation,
    editableConversationId,
    newTitle,
    handleNewConversation,
    handleConversationClick,
    handleTitleDoubleClick,
    handleTitleChange,
    handleTitleBlur,
  };
};
