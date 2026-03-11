# DeepShield AI

**Protecting truth in the age of synthetic media.**

DeepShield AI is an advanced, AI-powered deepfake detection platform designed for journalists, investigators, and cybersecurity teams. It provides a robust and intuitive suite of tools to analyze, detect, and verify synthetic media with high confidence.

## Features

- **Media Detection (`/detect`)**: Upload and analyze videos, images, or audio to detect deepfakes using state-of-the-art AI models.
- **Verification Dashboard (`/dashboard`)**: Monitor comprehensive analytics, detection history, and usage statistics in real-time.
- **Model Insights (`/insights`)**: Gain transparent access to underlying AI model performance, confidence scoring metrics, and technical insights.
- **API Documentation (`/api`)**: Integrate DeepShield's powerful verification engine directly into your own tools and workflows via our secure API.
- **Detailed Results Analysis**: In-depth breakdown of detected manipulations, artifacts, and synthesized content segments.

## Technology Stack

This project is built using modern web development practices and technologies:

- **Frontend Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management / Data Fetching**: [TanStack Query](https://tanstack.com/query/v5)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ap-00007/Deep-Shield.git
   cd Deep-Shield
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```
   *(or `yarn install` / `pnpm install` depending on your package manager)*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` (or the port specified by Vite in your terminal) to view the application.

## Building for Production

To create an optimized production build, run:
```bash
npm run build
```
This will compile your application into the `dist` directory, ready to be deployed to your hosting provider.

## License

© DeepShield AI. All rights reserved. Built for truth verification.
