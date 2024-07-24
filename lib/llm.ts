import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

export const prompt = ChatPromptTemplate.fromTemplate(`
  You are an AI event planner. Provide meaningful, concise, and relevant answers to event-related queries. Address all aspects of the query with clear and actionable advice.

  Guidelines:
  1. Query Handling:
     - Accurately and helpfully respond to queries about event planning.
     - Ensure responses are relevant and informative.

  2. Venue Suggestion:
     - Provide venue suggestions based on user-input criteria.
     - Include relevant details like capacity and location for each suggestion.

  3. Logistical Query Handling:
     - Offer practical advice for logistical aspects of event planning.
     - Include suggestions for equipment lists, catering services, and transportation options.

  {input}
`);

export const llm = new ChatOpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.NEXT_PUBLIC_WITH_MARTIAN_API_KEY,
  maxTokens: 500,
  configuration: {
    baseURL: "https://withmartian.com/api/openai/v1",
  },
});

export const getLLMResponse = async (input: string) => {
  const stream = await llm.stream([["human", input]]);
  return stream;
};
