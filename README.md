
# Blog Platform

A simple blog website built with React, TypeScript, Express, and MongoDB. It features JWT authentication and a basic post moderation system

## Built with
**Client side**

- ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=whitehttps://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Additionally, **Vitest** is used for unit testing, **RTK Query** is utilized for fetching server endpoints, and **Framer Motion** is employed for animations.

**Server side**

- ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Installation
This project is divided into two parts: the client and the server. Follow these instructions to set up and configure both parts.
#### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

### 1. Clone the repository:
```bash
git clone https://github.com/Yurgish/Blog.git <folder-name>
cd <folder-name>
```
> [!Note]
> Replace `<new-folder-name>` with the name of the new directory you want to create. The repository will be cloned into a new directory with this name.

If you want to clone the repository into the directory you are currently in, use the following command:
    
```bash
git clone https://github.com/Yurgish/Blog.git .
```

### 2. Set Up the Client
1. Navigate to the `client` directory: 
```bash 
cd client
 ```
2. Install the client dependencies: 
```bash 
npm install`
```
3. Create a `.env` file in the `client` directory and add the following environment variable: 
```bash
VITE_SERVER_API_URL=<your-server-url>
```
Replace `<your-server-url>` with the URL of your backend server.

4. Run the client: 
```bash 
npm run dev
```
For additional scripts and configurations, refer to the package.json file.

### 3. Set Up the Server
1. Navigate up one level to the parent directory and then navigate into the server directory: 
```bash 
cd ..
cd server
```
2. Install the client dependencies: 
```bash 
npm install`
```
3. Create a `.env` file in the `client` directory and add the following environment variable: 
```bash
MONGO_URL=<your-mongodb-connection-url>
APP_PORT=<your-port>
JWT_SECRET=<your-jwt-secret>
```
Replace `<your-mongodb-connection-url>`, `<your-port>`, and `<your-jwt-secret>` with the appropriate values for your MongoDB connection, port number, and JWT secret respectively.

4. Run the server: 
```bash 
npm run dev
```
## Description of API endpoints

| Method   | URL                                      | Description                                                                                           |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `GET`    | `/posts`                                 | Retrieve a list of posts with pagination. **Query Parameters**: `limit` (optional, number of posts per page, default 10) and `page` (optional, page number, default 1). |
| `POST`   | `/posts`                                 | Create a new post which is immediately sent for moderation. **Request Body**: `title`, `summary`, `content`, `tags` (all required).                                          |
| `PUT`    | `/posts/:id`                             | Update a post. If the post is in the approved posts list, it is moved to moderation. If the post is already in moderation, its data is updated. **Request Body**: `title` (optional), `summary` (optional), `content` (optional), `tags` (optional). |
| `GET`    | `/posts/:id`                             | Retrieve a post by its ID. If not found in the approved posts, check the moderation posts. **Path Parameter**: `id` (required).          |
| `DELETE` | `/posts/:id`                             | Delete a post by its ID from the approved posts. **Path Parameter**: `id` (required).                                                     |
| `POST`   | `/posts/:id/confirm`                     | Confirm a post that is in moderation and move it from the moderation posts to the approved posts. **Path Parameter**: `id` (required).   |
| `POST`   | `/posts/:id/refuse`                      | Refuse a post that is in moderation and add an admin message. **Path Parameter**: `id` (required). **Request Body**: `message` (required).                                        |
| `GET`    | `/moderated-posts`                       | Retrieve all posts under moderation (for admins), with pagination. **Query Parameters**: `limit` (optional, number of posts per page, default 10) and `page` (optional, page number, default 1). |
| `GET`    | `/user/posts/accepted`                  | Retrieve all accepted posts for a user with pagination. **Query Parameters**: `limit` (optional, number of posts per page, default 10) and `page` (optional, page number, default 1). |
| `GET`    | `/user/posts/rejected`                  | Retrieve all rejected posts for a user with pagination. **Query Parameters**: `limit` (optional, number of posts per page, default 10) and `page` (optional, page number, default 1). |
| `GET`    | `/user/posts/pending`                   | Retrieve all pending posts for a user with pagination. **Query Parameters**: `limit` (optional, number of posts per page, default 10) and `page` (optional, page number, default 1). |
| `POST`   | `/register`                             | Register a new user. **Request Body**: `login`, `email`, `password` (all required).                                                                               |
| `POST`   | `/login`                                | Log in to the system. Create a token and send it in a cookie. **Request Body**: `login`, `password` (both required).                                        |
| `POST`   | `/logout`                               | Log out of the system. Clear the token cookie. No additional parameters required.                                                        |
| `GET`    | `/check-auth`                           | Check if the user is authenticated using the token from cookies. No additional parameters required.                                    |

