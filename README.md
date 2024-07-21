# AI Event Assistant

This project is a web application designed to assist users in organizing events by providing AI-generated suggestions and answers to queries related to event planning.

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **Auth**: Supabase’s passwordless authentication
- **AI**: LangChain

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Supabase account

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
   SUPABASE_URL=https://example-supabase-url.supabase.co
   SUPABASE_KEY=example-supabase-key
   NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_KEY=$SUPABASE_KEY
   ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

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

### License

This project is licensed under the MIT License.
