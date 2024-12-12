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
- Uses MySQL as the database.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MySQL server

## Setup

### Clone the Repository
```bash
git clone git@github.com:parag477/codefortomorrow.git
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
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_NAME=<your_database_name>
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
- **Endpoint**: `POST /signup`
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

### User Login
- **Endpoint**: `POST /login`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

### Get User Info
- **Endpoint**: `GET /user`
- **Headers**:
  ```
  Authorization: Bearer <your_token>
  ```

### Forget Password
- **Endpoint**: `POST /forget-password`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com"
  }
  ```

## Technologies Used

### Frontend
- React
- Axios (for API calls)
- Bootstrap/Material-UI (optional, for styling)

### Backend
- Node.js
- Express.js
- MySQL (using Sequelize ORM)
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
- **GitHub**: https://github.com/parag477

