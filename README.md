# Welcome to your Lovable project

## Project info

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

### Required Environment Variables

- `VITE_API_URL`: The base URL for your API backend (e.g., `http://localhost:3000` for local development or `https://your-api-domain.com` for production)

### Setting Up Environment Variables

1. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```

2. Edit the `.env` file with your preferred text editor
3. Update the `VITE_API_URL` variable with your API endpoint
4. Save the file and restart your development server

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Create environment variables file.
cp .env.example .env

# Step 5: Configure your API URL.
# Edit the .env file and set your API endpoint:
# VITE_API_URL=http://localhost:3000  # Replace with your API URL

# Step 6: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
