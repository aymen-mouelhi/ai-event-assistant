/* eslint-disable @typescript-eslint/no-explicit-any */

export const fetchMessages = async (conversationId: string) => {
  const response = await fetch(
    `/api/messages?conversationId=${conversationId}`
  );
  return await response.json();
};

export const updateRateLimit = async (userId: string, count: number) => {
  await fetch("/api/rate_limit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId, messageCount: count }),
  });
};

export const saveMessage = async (message: any) => {
  await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
};

export const getRateLimit = async (userId: string) => {
  const response = await fetch(`/api/rate_limit?userId=${userId}`);
  return await response.json();
};

export const resetRateLimit = async (userId: string) => {
  await fetch("/api/rate_limit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      messageCount: 0,
      resetTime: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
    }),
  });
};
