# Authentication System

This is a simple authentication system built with React for the frontend and Node.js for the backend. It supports user registration, login, and secure session management.

## Features

- User registration
- User login
- Secure password hashing
- Token-based authentication
- Clean separation of frontend and backend code

## Folder Structure

```
Authentication-System/
├── frontend/     # React application
├── backend/      # Node.js application
```

### Frontend
- Built with React.
- Handles the user interface for registration and login.

### Backend
- Built with Node.js and Express.
- Provides RESTful APIs for user authentication.
- Uses secure password hashing (e.g., bcrypt).

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (if using a database for authentication)

## Setup

### Clone the Repository
```bash
git clone <repository-url>
cd Authentication-System
```

### Backend Setup
1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file for environment variables:
    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```
4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `frontend` folder:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Update the `src/config.js` file (or equivalent) with your backend URL.
4. Start the React development server:
    ```bash
    npm start
    ```

## Running the Application

1. Ensure both the backend and frontend servers are running.
2. Open a browser and navigate to `http://localhost:3000` to access the frontend.

## API Endpoints

### User Registration
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

### User Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

### Get User Info
- **Endpoint**: `GET /api/auth/me`
- **Headers**:
  ```
  Authorization: Bearer <your_token>
  ```

## Technologies Used

### Frontend
- React
- Axios (for API calls)
- Bootstrap/Material-UI (optional, for styling)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt (for password hashing)
- JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any issues or suggestions, feel free to contact:
- **Email**: your-email@example.com
- **GitHub**: [your-github-profile-url]

