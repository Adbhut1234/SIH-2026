# Terra-Verify 🌍

**Terra-Verify** is an Intelligent Land Record Digitization and Validation System built for the **Smart India Hackathon (SIH) 2026**. It addresses the problem statement **SIH26018** provided by the **Ministry of Rural Development**.

This platform aims to modernize cadastral systems by providing an automated pipeline to ingest, extract, validate, and securely store land records, creating a deterministic and reliable ledger of property ownership.

## 🚀 Features

*   **Intelligent Document Processing:** Upload scanned land records (PDF, TIFF, GeoPDF, GeoTIFF).
*   **AI-Powered Extraction:** Utilizes Google GenAI to automatically parse complex cadastral documents and extract structured metadata (Khasra numbers, owner names, locations).
*   **Validation Pipeline:** Verifies the extracted information against sovereign parcel registries and metes-and-bounds records.
*   **Deterministic Ledger:** A secure, immutable-style ledger interface to view and track all processed and verified land records.
*   **Modern UI/UX:** Built with a highly responsive, aesthetically pleasing interface emphasizing security and data integrity.

## 🛠️ Technology Stack

*   **Frontend:** [Next.js 16](https://nextjs.org/) (App Router), React 19
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL) for secure data storage
*   **AI Integration:** [Google GenAI API](https://ai.google.dev/) for document understanding and data extraction

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:
*   Node.js (v18 or higher recommended)
*   npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd terra-verify
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add your Supabase and Google GenAI credentials.
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    GOOGLE_GENAI_API_KEY=your_google_genai_api_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

*   `src/app/`: Contains the Next.js App Router pages and API routes.
    *   `/api/extract`: Handles AI document extraction.
    *   `/api/records`: Manages CRUD operations with Supabase.
*   `src/utils/`: Utility functions and clients (e.g., Supabase client).
*   `public/`: Static assets.

## 🤝 Contributing

Contributions are welcome! If you're part of the team, feel free to open a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE.md).
