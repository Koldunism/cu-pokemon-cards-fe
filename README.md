# Pokémon Cards Frontend

This project is a frontend application for displaying Pokémon cards, filtering them, and simulating battles between them. It is built using React and TypeScript.

## Features

- Display a grid of Pokémon cards with details such as name, HP, type, expansion, and rarity.
- Filter cards by name, expansion, and type.
- View detailed information about a selected card.
- Simulate battles between cards.
- Authentication with login screen.
- Automatically redirects to login if the authentication token expires or is invalid.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Clone the Repository

\`\`\`bash
git clone https://github.com/Koldunism/cu-pokemon-cards-fe.git
cd cu-pokemon-cards-fe
\`\`\`

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Setup Environment Variables

Create a \`.env\` file in the root directory of the project and add the following environment variable. Replace \`YOUR_BACKEND_URL\` with the URL where the backend is running.

\`\`\`env
REACT_APP_BACKEND_URL=YOUR_BACKEND_URL
\`\`\`

### Running the Application

\`\`\`bash
npm start
\`\`\`

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend Setup

This project relies on a backend service which is available at [cu-pokemon-cards-be](https://github.com/Koldunism/cu-pokemon-cards-be). Follow the instructions in the README of that repository to set up and run the backend service.

## Project Structure

- \`src/components\`: Contains the reusable components like Navbar and Card.
- \`src/pages\`: Contains the different pages of the application like Home, Login, and CardDetail.
- \`src/services\`: Contains the API service for making HTTP requests.

## Available Scripts

In the project directory, you can run:

- \`npm start\`: Runs the app in development mode.
- \`npm test\`: Launches the test runner in interactive watch mode.
- \`npm run build\`: Builds the app for production to the \`build\` folder.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
