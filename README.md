# TradeStream | Live Options Trade Feed

TradeStream is a real-time stock options trade monitoring application built with a modern, high-performance tech stack.

## Tech Stack Documentation

### Core Frameworks
- **[Next.js 15 (App Router)](https://nextjs.org/docs)**: The React framework for the web, utilizing Server Components for performance and Server Actions for secure backend logic.
- **[React 19](https://react.dev/)**: The library for building the user interface using functional components and hooks.
- **[TypeScript](https://www.typescriptlang.org/)**: Provides static type checking to ensure code reliability and better developer experience.

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid and responsive UI development.
- **[ShadCN UI](https://ui.shadcn.com/)**: A collection of re-usable components built using Radix UI and Tailwind CSS, providing a consistent and professional look.
- **[Lucide React](https://lucide.dev/)**: A clean and consistent icon library used throughout the application.
- **[Date-fns](https://date-fns.org/)**: Used for lightweight and reliable date formatting.

### Generative AI
- **[Genkit](https://github.com/firebase/genkit)**: An AI integration framework used to build agentic workflows.
- **[Google Generative AI (Gemini)](https://ai.google.dev/)**: The underlying LLM (Gemini 2.5 Flash) used for trade sentiment analysis and market insights.

### PWA & Mobile
- **Progressive Web App (PWA)**: Configured with a web manifest and service workers to allow the app to be installed on iOS and Android devices, providing a native-like experience.

## Getting Started

1. **Environment Variables**: Ensure your `.env` file contains the necessary API keys for Genkit (e.g., `GOOGLE_GENAI_API_KEY`).
2. **Development**: Run `npm run dev` to start the Next.js development server.
3. **AI Development**: Run `npm run genkit:dev` to start the Genkit developer UI for testing flows.

## Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable React components and ShadCN UI elements.
- `src/ai/`: Genkit AI flow definitions and prompts.
- `src/lib/`: Mock data, types, and utility functions.
