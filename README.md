# Beinghired.tech 🚀

Beinghired.tech is a modern job board application designed to connect students, freshers, and professionals with verified tech jobs, internships, and remote opportunities. The platform features a responsive, user-friendly interface for browsing and filtering job listings in real-time.

## ✨ Features

* **Job Search:** extensive search functionality to find jobs by title or company.
* **Advanced Filtering:** Filter opportunities by:
    * **Job Type:** Internship, Full-time.
    * **Batch:** Target specific graduation years (e.g., 2024, 2025 graduates).
    * **Location:** Filter by major tech hubs (Bengaluru, Gurgaon, Remote, etc.).
* **Real-time Data:** Jobs are fetched dynamically using Supabase.
* **Modern UI:** Built with a clean, responsive design using Tailwind CSS and Radix UI components.
* **Fast Performance:** Powered by Vite and React for a seamless user experience.

## 🛠️ Tech Stack

**Frontend:**
* [React](https://react.dev/) - UI Library
* [TypeScript](https://www.typescriptlang.org/) - Type Safety
* [Vite](https://vitejs.dev/) - Build Tool & Bundler
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
* [TanStack Query](https://tanstack.com/query/latest) - Server State Management

**UI Components:**
* [Radix UI](https://www.radix-ui.com/) - Headless UI Primitives
* [Lucide React](https://lucide.dev/) - Icons
* [Shadcn UI](https://ui.shadcn.com/) (inferred structure)

**Backend / Database:**
* [Supabase](https://supabase.com/) - Open Source Firebase Alternative (Database & Auth)

**Forms & Validation:**
* [React Hook Form](https://react-hook-form.com/)
* [Zod](https://zod.dev/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [Bun](https://bun.sh/) (Optional, but `bun.lockb` is present in the project)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/beinghired.tech.git](https://github.com/your-username/beinghired.tech.git)
    cd beinghired.tech
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Bun:
    ```bash
    bun install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory. You need to provide your Supabase credentials for the app to fetch data.

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    > **Note:** You can find these keys in your Supabase project dashboard under `Project Settings > API`.

### Running the App

Start the development server:

```bash
npm run dev
# or
bun run dev