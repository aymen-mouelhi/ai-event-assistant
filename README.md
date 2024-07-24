# AI Event Assistant

AI Event Assistant is a sophisticated web application designed to help users plan and organize events efficiently by leveraging AI-generated suggestions and responses to event planning queries. This project integrates modern frontend and backend technologies, AI models, and a scalable database solution.

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase’s passwordless authentication
- **AI**: LangChain, OpenAI

## Getting Started

### Prerequisites

- Node.js (>=18.17.0)
- npm or yarn
- Supabase account
- OpenAI API Key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aymen-mouelhi/ai-event-assistant.git
   cd ai-event-assistant
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://dummy-supabase-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy-supabase-key
   NEXT_PUBLIC_REDIRECT_URL=http://localhost:3001/pages/chat
   NEXT_PUBLIC_WITH_MARTIAN_API_KEY==sk-key
   DATABASE_URL="postgresql://localhost:5432/db"
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3001 with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

Then, start the production server:

```bash
npm start
# or
yarn start
```

### Development Workflow

1. Feature Development: Create a new branch from main for your feature.
2. Write Tests: Ensure all new features and bug fixes are covered by tests.
3. Run Tests: Use npm test to run the test suite and ensure all tests pass.
4. Lint and Format: Use npm run lint to check for linting errors and npm run format to format the code.
5. Code Review: Open a pull request and request a code review from your team.
6. Merge: After approval, merge the feature branch back into main.

## Documentation

For detailed technical information, please refer to the [Technical Documentation](docs/Technical_Documentation.md).

### Future Improvements

- Integrate LangChain memory for enhanced conversational capabilities.
- Improve the UI/UX with more interactive elements.
- Add more customization options for event planning.
- Support Social Login

### License

This project is licensed under the MIT License.
