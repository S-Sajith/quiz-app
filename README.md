# Quiz Web App

This is a **Quiz Web App** built using **React.js** and **Vite**. The app allows users to take a quiz, view their results, and retry the quiz if desired.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Running the App](#running-the-app)
3. [Project Structure](#project-structure)
4. [Technologies Used](#technologies-used)
5. [API Integration](#api-integration)
6. [Development Notes](#development-notes)
7. [Contributing](#contributing)

---

## Project Setup

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://npmjs.com)

### Install Dependencies

Clone this repository and navigate to the project directory in your terminal.

```bash
git clone https://github.com/S-Sajith/quiz-app.git
cd quiz-app
```

Install the dependencies:

```bash
npm install
```

---

## Running the App

Once the dependencies are installed, you can run the app in development mode.

```bash
npm run dev
```

This will start a local development server and open the app in your default browser. By default, it will be available at [http://localhost:5173](http://localhost:5173).

---

## Project Structure

Here's an overview of the main files and folders in this project:

```
📦src
 ┣ 📂assets
 ┃ ┗ 📜upraised-logo.png
 ┣ 📂components
 ┃ ┣ 📜GuageComponent.jsx
 ┃ ┣ 📜GuageComponent.module.css
 ┃ ┣ 📜HomePage.jsx
 ┃ ┣ 📜HomePage.module.css
 ┃ ┣ 📜QuestionPage.jsx
 ┃ ┣ 📜QuestionPage.module.css
 ┃ ┣ 📜ResultPage.jsx
 ┃ ┗ 📜ResultPage.module.css
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜main.jsx
📜eslint.config.js
📜index.html
📜package.json
📜README.md
📜vite.config.js
```

- **src/**

  - `assets/`: Contains any assets such as images, like the `upraised-logo.png`.
  - `components/`: Contains the React components for the app (`HomePage.jsx`, `QuestionPage.jsx`, etc.) and their corresponding styles.
  - `App.jsx`: Main application component that renders all pages.
  - `main.jsx`: Entry point for the app.
  - `index.css`: Global styles for the app.

- **vite.config.js**: Configuration file for Vite.
- **eslint.config.js**: Configuration file for ESLint.

---

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Vite**: A next-generation, fast build tool for React applications.
- **CSS**: Styling for the web app (plain CSS used).
- **React Router**: For routing between different pages of the quiz.
- **react-gauge-chart**: Used for the gauge component to show the quiz score.

---

## API Integration

For the mock API, I have used **WireMock Cloud** to host mock APIs. This is used to simulate backend responses for the quiz. Since this is a mock API, no specific endpoints are listed, but it handles the quiz logic, including fetching quiz questions, simulating submitting answers and providing results.

---

## Development Notes

### Working with Vite

- Vite provides fast development build times and hot module replacement (HMR).
- The app is set up with JavaScript.
- All components are styled with plain CSS.

### Routing

- **React Router** has been used for navigation between pages like `HomePage`, `QuestionPage`, and `ResultPage`.

### Gauge Component

- The gauge chart showing the user's score is implemented using the **`react-gauge-chart`** library. It provides a visually appealing way to display scores.

---

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write clear, concise commit messages.
4. Submit a pull request with a description of the changes you've made.

---
