# Zenith Directory: A Minimalist Online Directory Platform

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/leonidaster/Directory-creado-por-claudflare)

Zenith Directory is a visually stunning, minimalist web application designed to function as a modern online directory. It features a clean, content-focused design with an emphasis on white space, elegant typography, and an intuitive user experience. The application consists of a beautiful landing page with a prominent search bar and featured listings, a comprehensive listings page with advanced search and filtering, and a detailed view for each individual listing. The entire platform is built to be fast, responsive, and aesthetically pleasing, providing a premium experience for users browsing the directory.

## Key Features

-   **Stunning Homepage**: A visually striking landing page with a full-width hero section, a prominent search bar, and curated 'Featured' listings.
-   **Comprehensive Listings**: A directory view displaying all listings in a clean, responsive grid with powerful search and filtering capabilities.
-   **Detailed Listing View**: An in-depth look at a single directory item, including an image gallery, detailed description, key information, and contact details.
-   **Minimalist & Responsive Design**: A clean, uncluttered UI built with a mobile-first approach, ensuring a flawless experience on any device.
-   **High-Performance Backend**: Built on Cloudflare Workers and Durable Objects for a fast, scalable, and globally distributed backend.

## Technology Stack

-   **Frontend**:
    -   [React](https://reactjs.org/)
    -   [Vite](https://vitejs.dev/)
    -   [React Router](https://reactrouter.com/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [shadcn/ui](https://ui.shadcn.com/)
    -   [Framer Motion](https://www.framer.com/motion/) for animations
    -   [Lucide React](https://lucide.dev/) for icons
    -   [Zustand](https://zustand-demo.pmnd.rs/) for state management
-   **Backend**:
    -   [Hono](https://hono.dev/) on [Cloudflare Workers](https://workers.cloudflare.com/)
    -   [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) for persistent storage
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Validation**: [Zod](https://zod.dev/)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/)
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) logged into your Cloudflare account.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd zenith-directory
    ```

2.  **Install dependencies:**
    This project uses `bun` for package management.
    ```bash
    bun install
    ```

## Development

To start the local development server, which includes both the Vite frontend and the Hono backend via `wrangler`, run:

```bash
bun dev
```

This will start the Vite development server, typically on `http://localhost:3000`, with hot-reloading for the frontend. The Cloudflare Worker backend will also run locally, and requests from the frontend will be proxied to it.

### Project Structure

-   `src/`: Contains the React frontend application (pages, components, hooks, etc.).
-   `worker/`: Contains the Hono backend application running on Cloudflare Workers.
-   `shared/`: Contains shared code, primarily TypeScript types, used by both the frontend and backend.

## Deployment

This project is designed for easy deployment to Cloudflare Pages.

1.  **Build the project:**
    The `deploy` script in `package.json` handles building the application.

2.  **Deploy to Cloudflare:**
    Run the following command to deploy your application using the Wrangler CLI:

    ```bash
    bun run deploy
    ```

    This command will build the frontend assets, then deploy both the static site and the worker functions to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/leonidaster/Directory-creado-por-claudflare)