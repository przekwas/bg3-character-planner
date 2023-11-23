# Express Character Level-Up API

This project builds a simple Express.js server that interacts with a front-end allowing users to level up a character and select classes for each level. It demonstrates fundamental concepts of web development, server-side processing, and client-server interaction.

## What We Will Learn

-   **Express.js Basics**: Learn to set up and run an Express server.
-   **File Operations**: Read and write JSON files with Node.js to maintain state.
-   **Building RESTful API**: Develop REST API endpoints to handle web requests.
-   **Frontend-Backend Communication**: Use forms to send data to the server and fetch to retrieve data.
-   **Dynamic Content on Client Side**: Use JavaScript to dynamically update the DOM.
-   **Data Validation**: Perform server-side validation of user inputs.
-   **Bootstrap for Styling**: Implement Bootstrap to create responsive layouts.
-   **Error Handling**: Practice proper error handling techniques.

## Project Structure

```
express-character-levelup/
├── node_modules/
├── public/
│ ├── app.js
│ ├── index.html
│ └── style.css
├── server/
│ ├── data/
│ │ └── character.json
│ ├── characterService.js
│ └── server.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/covalence-io/express-character-levelup.git
```

2. Navigate to the project directory:

```bash
cd express-character-levelup
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. Open `http://localhost:3000` in your web browser to view the application.

## Usage

-   Use the form on the front end to select a class and "level up" your character.
-   The character's progression is displayed in a table format, showing the level and class chosen.
-   The server ensures that no more than 12 levels can be added to a character.
