# TaskSphere

TaskSphere is a full-stack task management application built with the MERN stack. It provides a kanban-style dashboard for creating, editing, deleting, searching, sorting, and dragging tasks between workflow columns.

## Features

- User authentication with JWT
- User registration and login
- Task creation with title, description, priority, and due date
- Edit and delete task actions
- Drag-and-drop task movement across Todo, In Progress, and Done columns
- Search and sorting capabilities
- Analytics chart for task distribution
- Responsive dashboard layout
- Real-time updates using Socket.IO

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- @hello-pangea/dnd
- Recharts
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.IO
- CORS
- dotenv

## Project Structure

```text
TaskSphere/
├── TaskSphere_backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
└── tasksphere-frontend/
    ├── public/
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        └── App.js
```

## Installation

### Backend

```bash
cd TaskSphere_backend
npm install
npm run dev
```

### Frontend

```bash
cd tasksphere-frontend
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the backend folder with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open the app in your browser.
4. Register an account, log in, and manage your tasks.

## Notes

This project demonstrates a practical full-stack MERN implementation with authentication, CRUD operations, drag-and-drop task management, analytics, and real-time communication.

## Future Improvements

- Improve MongoDB production configuration
- Add protected route context and role-based access
- Add pagination and filtering on the server side
- Expand analytics with charts and trends
- Improve test coverage
