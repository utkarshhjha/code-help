# CodeHelp

## Index
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
- [Code Structure](#code-structure)
  - [Server](#server)
  - [Client](#client)
  - [File and Folder Structure](#file-and-folder-structure)
- [Customization](#customization)
  - [CodeMirror Themes](#codemirror-themes)
  - [Toast Notifications](#toast-notifications)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The idea for this project came from the frequent times my friends and I needed help with our code. Sending and receiving code snippets back and forth was cumbersome, and using tools like Google Meet often faced issues with internet stability, lag, and poor video quality. To make collaborative coding easier and more efficient, I developed a real-time code collaboration application. This app features a code editor, user management, and real-time synchronization of code changes, allowing us to work together seamlessly and solve coding doubts hands-on.

## Features

- **Real-time code editing**: Multiple participants can edit code simultaneously.
- **User management**: Users can join and leave rooms, and their presence is updated in real-time.
- **Code synchronization**: Code changes are synchronized across all participants in real-time.
- **Clipboard copy**: Room IDs can be copied to the clipboard for easy sharing.
- **Notifications**: Users are notified when other participants join or leave the room.
- **Dark theme**: The code editor uses a dark theme for a comfortable coding experience.

## Tech Stack

- **Frontend**: React, CodeMirror, Bootstrap
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.io
- **Styling**: Bootstrap, custom CSS

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- A code editor (e.g., VSCode)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/real-time-code-collaboration.git
   cd real-time-code-collaboration
   ```

2. **Install dependencies for the server and client**:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. **Run the server**:
   ```bash
   cd server
   npm start
   ```

4. **Run the client**:
   ```bash
   cd client
   npm start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Start a new session**:
   - Enter a username and create a new room or join an existing room using a Room ID.

2. **Collaborate**:
   - Participants can join the room using the Room ID.
   - Code in the editor and see changes in real-time.

3. **Leave the room**:
   - Click on the "Leave Room" button to exit the room.

## Code Structure

### Server

- `server/index.js`: Entry point for the server, handles Socket.io connections and events.

### Client

- `client/src/App.js`: Main application component.
- `client/src/components/Editor.js`: Code editor component using CodeMirror.
- `client/src/components/Client.js`: Component to display participant information.
- `client/src/components/EditorPage.js`: Main page for the editor and participants list.
- `client/src/components/Home.js`: Home page component.
- `client/src/Actions.js`: Action constants for Socket.io events.
- `client/src/Socket.js`: Initializes and exports the Socket.io client.

### File and Folder Structure

```
real-time-code-collaboration/
├── server/
│   ├── index.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Client.js
│   │   │   ├── Editor.js
│   │   │   ├── EditorPage.js
│   │   │   └── Home.js
│   │   ├── Actions.js
│   │   ├── App.js
│   │   ├── Socket.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── README.md
└── package.json
```

## Customization

### CodeMirror Themes

You can change the CodeMirror theme by modifying the import in `Editor.js`:

```js
import "codemirror/theme/dracula.css"; // Change 'dracula' to your desired theme
```

### Toast Notifications

Toast notifications can be customized in `EditorPage.js`:

```js
import { Toaster, toast } from 'react-hot-toast';

<Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: "#333",
      color: "#fff",
    },
  }}
/>
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [kanishkgupta.dev@gmail.com].

---
