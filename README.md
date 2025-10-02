# 🚀 CodeLive - Real-Time Collaborative Code Editor

<div align="center">

![CodeLive Logo](./Frontend/src/assets/logo_codellive.png)

**A powerful real-time collaborative coding platform for seamless remote interviews, pair programming, and team collaboration.**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-010101?logo=socket.io)](https://socket.io/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**CodeLive** is a full-stack web application that enables multiple users to code together in real-time. Built with modern web technologies, it provides a seamless experience for collaborative coding sessions, technical interviews, and educational purposes. The platform combines the power of Monaco Editor (VS Code's editor) with real-time synchronization using Yjs and WebSocket technology.

### ✨ Key Highlights

- 🎯 **Real-time Collaboration**: Multiple users can edit code simultaneously with instant synchronization
- 💬 **Integrated Chat**: Built-in messaging system for seamless communication
- 🎨 **Monaco Editor**: Professional code editing experience with syntax highlighting and IntelliSense
- 🔐 **Google OAuth**: Secure authentication using Google Sign-In
- 🌓 **Theme Support**: Toggle between light and dark modes
- 📱 **Responsive Design**: Works flawlessly across desktop and mobile devices
- 🔄 **Auto-sync**: Automatic state synchronization using Yjs CRDT (Conflict-free Replicated Data Type)

---

## 🌟 Features

### Collaborative Editing
- **Live Code Synchronization** - Changes appear instantly for all participants
- **Multi-language Support** - JavaScript, Python, Java, C++, and more
- **Monaco Editor Integration** - VSCode-like editing experience in the browser
- **Cursor Tracking** - See where other users are editing in real-time

### Communication
- **Real-time Chat** - Text messaging within coding rooms
- **User Presence** - Track active participants with join/leave notifications
- **Timestamp Tracking** - See when users joined the session

### Room Management
- **Unique Room IDs** - Create or join rooms with shareable identifiers
- **User Count Display** - Real-time count of active participants
- **Graceful Disconnection** - Automatic cleanup when users leave

### User Experience
- **Google OAuth** - Quick and secure authentication
- **Guest Access** - Join with temporary usernames
- **Theme Toggle** - Switch between light and dark modes
- **Responsive UI** - Built with Tailwind CSS for modern aesthetics

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18.3** | Modern UI library with hooks and context API |
| **Redux Toolkit** | State management for authentication and app state |
| **Tailwind CSS** | Utility-first CSS framework for responsive design |
| **Monaco Editor** | Professional code editor (VSCode's editor) |
| **Socket.IO Client** | Real-time bidirectional communication |
| **Yjs** | CRDT for conflict-free collaborative editing |
| **React Router** | Client-side routing and navigation |
| **Lucide React** | Beautiful icon library |
| **Vite** | Fast build tool and development server |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **Socket.IO** | Real-time WebSocket communication |
| **Yjs + y-websocket** | Collaborative editing synchronization |
| **MongoDB + Mongoose** | Database for persistent data storage |
| **Redis (ioredis)** | In-memory data structure store for session management |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Monaco      │  │   Socket.IO  │  │     Yjs      │      │
│  │  Editor      │  │   Client     │  │   Provider   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ WebSocket + HTTP
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Backend (Node.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Express    │  │  Socket.IO   │  │  Y-Websocket │      │
│  │   Server     │  │   Server     │  │   Server     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐              ┌──────────────┐            │
│  │   MongoDB    │              │    Redis     │            │
│  │  (Mongoose)  │              │  (ioredis)   │            │
│  └──────────────┘              └──────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

**Frontend Structure:**
- `src/pages/` - Main application pages (HomePage, CodeSpace, AuthPage, etc.)
- `src/components/` - Reusable UI components (ChatBox, MonacoEditor, Navbar, etc.)
- `src/context/` - React Context providers for Auth and Code state
- `src/ReduxStore/` - Redux store configuration and slices
- `src/utils/` - Utility functions and custom hooks

**Backend Structure:**
- `server.js` - Main server entry point with Socket.IO and WebSocket setup
- `controllers/` - Business logic for rooms, chat, and REST APIs
- `config/` - Database configuration and connection utilities
- `utils/` - Helper functions and utilities

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Redis** (optional, for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/karanhimadri/Codellive----Real_Time_Code-Sharing_Platform.git
   cd Codellive----Real_Time_Code-Sharing_Platform
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_url (optional)
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

   Create a `.env` file in the Frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:8080
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on `http://localhost:8080`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Application will open on `http://localhost:5173`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Sign in with Google or use a guest username
   - Create a new room or join an existing one
   - Start coding collaboratively!

---

## 📸 Screenshots

### Home Page
Beautiful landing page with project overview and features

### Code Editor
Real-time collaborative Monaco editor with syntax highlighting

### Chat Interface
Integrated chat system for seamless communication

---

## 🎯 Use Cases

- **Technical Interviews** - Conduct remote coding interviews with real-time collaboration
- **Pair Programming** - Work together on code with team members
- **Code Reviews** - Review and discuss code changes in real-time
- **Teaching & Learning** - Educators can teach coding concepts interactively
- **Hackathons** - Collaborate with team members during coding competitions

---

## 🔮 Future Enhancements

- [ ] Video/Audio calling integration
- [ ] Code execution and output display
- [ ] File system for multiple files in a project
- [ ] Version control integration (Git)
- [ ] Customizable themes and editor settings
- [ ] Screen sharing capabilities
- [ ] Code snippet sharing and templates
- [ ] Session recording and playback
- [ ] AI-powered code suggestions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Himadri Karan**

- GitHub: [@karanhimadri](https://github.com/karanhimadri)
- LinkedIn: [Connect with me](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- Socket.IO for real-time communication
- Yjs for CRDT-based synchronization
- React and the amazing open-source community

---

<div align="center">

**Made with ❤️ and lots of ☕**

If you found this project helpful, please give it a ⭐️!

</div>
