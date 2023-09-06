# Frontend

This is the frontend part of the "Course Connect" project, built using React and Vite. It provides a user interface for interacting with the backend API to perform CRUD operations and utilizes Material UI for better structure and design.

## Setup

To get started with the project, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/kunal232i/course-connect.git
```

2. Navigate to the project directory:

```bash
cd course-connect/frontend
```

3. Before running the frontend, make sure you have the backend up and running. If you haven't set up the backend yet, you can find the instructions here: [Course Connect Backend](https://github.com/kunal232i/course-connect/tree/main/backend).

4. Set up the environment variable by creating a `.env` file in the root of the frontend directory. Replace the `VITE_VITE_BASE_URL` with the backend base URL. For example:

```plaintext
VITE_VITE_BASE_URL="http://localhost:8000"
```

Make sure to replace `http://localhost:8000` with the actual base URL of your backend API.

5. Install the dependencies:

```bash
npm install
```

6. Run the development server:

```bash
npm run dev
```

## Features

- Authorization: The frontend is integrated with an authentication system to ensure secure access to the application.
- CRUD Operations: Users can perform Create, Read, Update, and Delete operations on the data using the backend API.
- Material UI: The frontend is designed using Material UI components, providing a clean and visually appealing user interface.

Feel free to explore the code and customize the frontend as per your requirements!
