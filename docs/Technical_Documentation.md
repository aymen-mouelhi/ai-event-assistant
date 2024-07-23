# Technical Documentation: AI Event Assistant

## Overview

AI Event Assistant is a web application designed to assist users in organizing events by providing AI-generated suggestions and responses to event-related queries. This document provides a detailed technical overview, covering system architecture, key components, data flow, and technology choices.

## Table of Contents

1. Introduction
2. System Architecture
3. Key Components
4. Technology Choices and Justifications
5. Authentication Flow
6. Database Schema
7. AI Integration
8. Getting Started
9. Development Workflow
10. Conclusion

## 1. Introduction

AI Event Assistant leverages modern web technologies, real-time databases, and AI capabilities to deliver a seamless event planning experience. It helps users by providing personalized and actionable advice on various aspects of event planning, such as venue selection, logistics, and more.

## 2. System Architecture

The architecture of AI Event Assistant includes:

- **Frontend**: Built with Next.js and Tailwind CSS for a responsive and dynamic user interface.
- **Backend**: Implemented using Next.js API routes and Node.js, providing RESTful endpoints.
- **Database**: Supabase for real-time database interactions and user authentication.
- **AI Integration**: LangChain and OpenAI for natural language processing and AI-generated suggestions.

### High-Level Architecture Diagram

```
+----------------+        +------------------+        +--------------------+
|                |        |                  |        |                    |
|   Frontend     +-------->   Backend        +-------->   Database         |
| (Next.js, CSS) |        | (Next.js API)    |        | (Supabase)         |
|                |        |                  |        |                    |
+----------------+        +------------------+        +--------------------+
        |                          |                            |
        |                          |                            |
        |                          |                            |
        |                          |                            |
        |                          |                            |
        |                          |                            |
        |                          |                            |
+----------------+        +------------------+        +--------------------+
|                |        |                  |        |                    |
|   AI Engine    <--------+   OpenAI         <--------+    LangChain       |
| (LangChain)    |        |  (AI Model)      |        | API Integration    |
|                |        |                  |        |                    |
+----------------+        +------------------+        +--------------------+
```

## 3. Key Components

### Frontend

- **Next.js**: Provides server-side rendering and static site generation capabilities, ensuring fast load times and SEO benefits.
- **Tailwind CSS**: Utility-first CSS framework for efficient styling.
- **TypeScript**: Adds static typing to JavaScript, enhancing code quality and maintainability.

### Backend

- **Next.js API Routes**: Handle various API endpoints for user management, conversations, messages, and rate limits.
- **Node.js**: Runtime environment for executing server-side code.

### Database

- **Supabase**: PostgreSQL database with real-time capabilities. Used for storing user data, conversations, messages, and rate limits.

### AI Integration

- **LangChain**: Framework for developing applications with large language models (LLMs).
- **OpenAI**: API for accessing powerful AI models to generate event-related suggestions.

## 4. Technology Choices and Justifications

### LangChain and OpenAI

- **LangChain**: Chosen for its flexibility and powerful abstractions to manage conversations and interactions with large language models.
- **OpenAI**: Provides access to state-of-the-art AI models, allowing for the generation of meaningful, relevant, and actionable responses to user queries.

### Supabase

- **Real-Time Capabilities**: Enables real-time updates and interactions, essential for a responsive user experience.
- **Authentication**: Supabase provides a robust authentication system, including passwordless login via magic links, which enhances security and user experience.

### Next.js

- **Server-Side Rendering**: Improves performance and SEO by pre-rendering pages on the server.
- **Static Site Generation**: Allows for static content to be generated at build time, improving load times and scalability.

## 5. Authentication Flow

1. **User Login**: Users log in using Supabase's passwordless authentication (magic links).
2. **Session Management**: Supabase manages user sessions, and the frontend checks for a valid session on each page load.
3. **User Creation**: If a new user logs in, their details are stored in the database.

### Authentication Flow Diagram

```
+------------------+                      +--------------------+                    +------------------+
|                  |                      |                    |                    |                  |
|   User           +--------------------->+   Supabase         +------------------->+   Database       |
|                  |                      |  (Authentication)  |                    |  (Store User)    |
+------------------+                      +--------------------+                    +------------------+
        ^                                             |
        |                                             |
        |                                             |
        +---------------------------------------------+
                          Check Session
```

## 6. Database Schema

### Users Table

- **id**: Unique identifier for the user.
- **email**: Email address of the user.

### Conversations Table

- **id**: Unique identifier for the conversation.
- **userId**: Reference to the user who owns the conversation.
- **name**: Name of the conversation.

### Messages Table

- **id**: Unique identifier for the message.
- **conversationId**: Reference to the conversation the message belongs to.
- **content**: Content of the message.

### Rate Limits Table

- **userId**: Reference to the user.
- **messageCount**: Number of messages sent within the rate limit period.
- **resetTime**: Timestamp indicating when the rate limit resets.

## 7. AI Integration

### AI Model Configuration

The AI Event Assistant utilizes LangChain and OpenAI to provide intelligent responses to user queries. The system is designed to handle various aspects of event planning, including venue suggestions and logistical advice.

### AI Response Flow

1. **User Query**: The user inputs a query related to event planning.
2. **Prompt Generation**: The system constructs a prompt based on predefined templates and user input.
3. **AI Processing**: The prompt is sent to the OpenAI API via LangChain, which processes the input and generates a response.
4. **Streaming Response**: The response is streamed back to the frontend in real-time, providing immediate feedback to the user.

## 8. Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- Node.js (version 18.17.0 or later)
- npm or yarn
- Supabase account
- OpenAI API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aymen-mouelhi/ai-event-assistant.git
   cd ai-event-assistant
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://dummy-supabase-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy-supabase-key
   NEXT_PUBLIC_REDIRECT_URL=http://localhost:3001/pages/chat
   NEXT_PUBLIC_OPEN_AI_API_KEY=sk-key
   DATABASE_URL="postgresql://localhost:5432/db"
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

### Running the Application

- **Development Server:**

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  Open `http://localhost:3001` in your browser to see the application.

- **Production Build:**

  ```bash
  npm run build
  # or
  yarn build
  ```

  Start the production server:

  ```bash
  npm start
  # or
  yarn start
  ```

## 9. Development Workflow

1. **Feature Development**: Create a new branch from `main` for your feature.

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Write Tests**: Ensure all new features and bug fixes are covered by tests.

3. **Run Tests**: Use `npm test` or `yarn test` to run the test suite and ensure all tests pass.

   ```bash
   npm test
   # or
   yarn test
   ```

4. **Lint and Format**: Use `npm run lint` to check for linting errors and `npm run format` to format the code.

5. **Code Review**: Open a pull request and request a code review from your team.

6. **Merge**: After approval, merge the feature branch back into `main`.

## 10. Conclusion

The AI Event Assistant is a robust and intelligent application designed to simplify event planning through the use of modern web technologies and advanced AI models. By integrating Next.js, Supabase, LangChain, and OpenAI, the application provides a seamless and responsive user experience, ensuring that users receive relevant and actionable advice.
