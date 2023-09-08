# Backend

## Technologies Used

- NodeJS
- Express.js
- MongoDB (as the database)
- JWT Tokens for user and admin authentication
- Nodemon for server auto-restart

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using the following command:
   ```
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory of the project and set the following environment variables:

```
DB_URL=  # MongoDB connection URL
ADMIN_ACCESS_TOKEN_SECRET=  # Secret key for admin JWT token
USER_ACCESS_TOKEN_SECRET=   # Secret key for user JWT token
PORT=  # Port number for the server
```

## Run the Application

To start the server, run the following command:

```
npm start
```

## API Endpoints

### User API

#### Signup

- Method: POST
- URL: `/user/signup`
- Request Body:
  ```
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- Response (Success):
  ```
  {
    "message": "new user created successfully!!",
    "token": "<user_access_token>"
  }
  ```
- Response (Error):
  ```
  {
    "message": "User already exists!!"
  }
  ```

#### Login

- Method: POST
- URL: `/user/login`
- Request Body:
  ```
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- Response (Success):
  ```
  {
    "message": "user logged in successfully!!",
    "token": "<user_access_token>"
  }
  ```
- Response (Error):
  ```
  {
    "message": "Invalid username or password"
  }
  ```

#### Get Courses

- Method: GET
- URL: `/user/courses`
- Authorization: Bearer \<user_access_token\>
- Response:
  ```
  {
    "courses": [...]
  }
  ```

#### Purchase Course

- Method: POST
- URL: `/user/courses/:courseId`
- Authorization: Bearer \<user_access_token\>
- Response (Success):
  ```
  {
    "message": "course purchased successfully",
    "id": "<courseId>"
  }
  ```
- Response (Error - Course not found):
  ```
  {
    "message": "course not found"
  }
  ```
- Response (Error - User not found):
  ```
  {
    "message": "User not found"
  }
  ```

#### Get Purchased Courses

- Method: GET
- URL: `/user/purchasedCourses`
- Authorization: Bearer \<user_access_token\>
- Response:
  ```
  {
    "purchasedCourses": [...]
  }
  ```

### Admin API

#### Signup

- Method: POST
- URL: `/admin/signup`
- Request Body:
  ```
  {
    "username": "admin1",
    "password": "admin123"
  }
  ```
- Response (Success):
  ```
  {
    "message": "Admin Created Successfully!!",
    "token": "<admin_access_token>"
  }
  ```
- Response (Error):
  ```
  {
    "message": "Admin already exists!!"
  }
  ```

#### Login

- Method: POST
- URL: `/admin/login`
- Request Body:
  ```
  {
    "username": "admin1",
    "password": "admin123"
  }
  ```
- Response (Success):
  ```
  {
    "message": "You logged in successfully!!",
    "token": "<admin_access_token>"
  }
  ```
- Response (Error):
  ```
  {
    "message": "Invalid username or password"
  }
  ```

#### Get Admin Details

- Method: GET
- URL: `/admin/me`
- Authorization: Bearer \<admin_access_token\>
- Response:
  ```
  {
    "username": "admin1",
    "password": "hashed_password"
  }
  ```

#### Create Course

- Method: POST
- URL: `/admin/courses`
- Authorization: Bearer \<admin_access_token\>
- Request Body:
  ```
  {
    "title": "Course Title",
    "description": "Course Description",
    "price": 49.99,
    "image": "course_image_url",
    "published": true
  }
  ```
- Response (Success):
  ```
  {
    "message": "course created successfully!!",
    "courseId": "<courseId>"
  }
  ```

#### Update Course

- Method: PUT
- URL: `/admin/course/:courseId`
- Authorization: Bearer \<admin_access_token\>
- Request Body:
  ```
  {
    "title": "Updated Course Title",
    "description": "Updated Course Description",
    "price": 59.99,
    "image": "updated_course_image_url",
    "published": true
  }
  ```
- Response (Success):
  ```
  {
    "message": "Course updated successfully"
  }
  ```
- Response (Error - Course not found):
  ```
  {
    "message": "Course not found"
  }
  ```

#### Get All Courses

- Method: GET
- URL: `/admin/courses`
- Authorization: Bearer \<admin_access_token\>
- Response:
  ```
  {
    "courses": [...]
  }
  ```

## Conclusion

This README provides an overview of the backend codebase and the API endpoints available for users and admins. For more detailed information about each endpoint and functionality, refer to the codebase and the relevant comments in the files. Happy coding!
