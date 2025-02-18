# Portfolio - Igor de Moura

This repository contains the source code for my online portfolio.

## ⚙️ Technologies Used

* **Next.js 13:** React framework for web development.
* **TypeScript:** Language that adds static typing to JavaScript.
* **Tailwind CSS:** Utility-first framework for fast and efficient styling.
* **Framer Motion:** Library for smooth animations and transitions.
* **Hygraph CMS:** Headless CMS platform for content management.


## 🚀 How to Run the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/igordmouraa/portfolio-igor
   ```

2. **Install the dependencies:**

   ```bash
   cd <folder-name> # Replace <folder-name> with the name of the folder where you cloned the project.
   yarn install # or npm install
   ```

3. **Configure Hygraph CMS:**

    - Create a Hygraph account if you don't already have one.
    - Create a new project and configure the schema as needed.
    - Copy your Hygraph API access token.

4. **Configure environment variables:**

    - Create a `.env.local` file in the root of the project.
    - Paste your Hygraph token and set other environment variables if necessary:

   ```
   HYGRAPH_TOKEN=YOUR_HYGRAPH_TOKEN
   # Other environment variables...
   ```

5. **Run the project in development mode:**

   ```bash
   yarn dev # or npm run dev
   ```

The project will be available at: `http://localhost:3000`

