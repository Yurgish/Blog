<p align="center">
    <img width="1000" height="260" alt="image" src="https://github.com/user-attachments/assets/546dc3d7-7404-4b3a-bfec-159976a5b5f4" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node JS">
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express JS">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT">
</p>

<h1 align="center">
  nLog, a Blogging web app
</h1>

A **simple blog app** built with **React, TypeScript, Express, and MongoDB**, featuring **JWT authentication**, **post moderation**, and a clean design inspired by a Figma community template. </br>
The project was created as a practice assignment to implement a **full-stack CRUD application** with authentication, role-based permissions and  user/admin interactions.

## 📑 Table of Contents
1. [Features](#-features)  
2. [Tech Stack](#%EF%B8%8F-tech-stack)  
3. [Showcase](#-showcase)  
4. [Database](#-database)
5. [API endpoints](#-api-endpoints)
6. [Installation](#-installation)

---

## ✨ Features

- 🔐 **JWT Authentication** (register, login, logout, auth check)
- 👤 **User roles**: Regular User & Admin
- 📝 **Post CRUD operations** (create, read, update, delete)
- ⚖️ **Post moderation system**
  - New posts go to **pending moderation**
  - Admin can **approve** (post goes public) or **reject** (with feedback message)
- 📂 **User dashboard**
  - View **approved**, **pending**, and **rejected** posts
  - Edit or resubmit rejected posts
- 🎨 **Responsive UI** (design adapted from a Figma community project — [link to design](https://www.figma.com/community/file/1118764549305878223/nlog-a-blogging-website))

---

## 🛠️ Tech Stack

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

## 🖼 Showcase

A quick story told through GIFs 👇

### 1. Registration & Login

A new user signs up and logs in to the app.  

![blogLogIn](https://github.com/user-attachments/assets/471ba436-1510-4450-9639-5a2c6eecb9a0)

---

### 2. Creating a Post

User writes a post, adds tags, and submits it → the post goes into **moderation**.  

![blogCreate](https://github.com/user-attachments/assets/2ae720f5-a66c-49d2-8a2e-a06bca496781)

---

### 3. The Moderation Path
There are two possible outcomes:  

- ✅ **Admin Approves**

  The post is approved and immediately appears on the homepage.

  ![blogPostApprovedPost](https://github.com/user-attachments/assets/2a2bbae8-dcd7-4b84-bfea-2dd8e373f635)


- ❌ **Admin Rejects**

  The post is rejected with feedback 👇
  
  ![blogRefusePost](https://github.com/user-attachments/assets/68a8ac13-3df0-4701-a4c2-e64e2f2a0a47)

  Then user edits & resubmits → and maybe post gonna be approved.
  
  ![blogUserResubmitsPost](https://github.com/user-attachments/assets/24d4ec4f-a80b-434c-976b-50f0820e00eb)

---

### 4. Mobile Experience

A quick look at how the app feels on mobile 👇.  

<p align="center">
  <img src="https://github.com/user-attachments/assets/0f9546fc-1eb0-4a16-9175-8d3ca0b9c609" height="400">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/cbf1d31e-a6e1-493e-ab37-a2368067c9eb" height="400">
</p>

## 🗄 Database

### 👤 Users Collection

This collection stores user information.

| Field | Data Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | A unique identifier for the user. |
| `login` | `String` | The user's login username. **Required field.** |
| `email` | `String` | The user's email address. **Required** and must be unique. |
| `password` | `String` | The user's hashed password. **Required field.** |
| `roles` | `Array<String>` | An array of the user's roles, referencing the `roles` collection. |
| `createdAt` | `Date` | The date and time the account was created. |
| `updatedAt` | `Date` | The date and time the document was last updated. |

---

### 📝 Posts Collection

This collection contains information about published posts.

| Field | Data Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | A unique identifier for the post. |
| `title` | `String` | The title of the post. **Required field.** |
| `summary` | `String` | A brief summary of the post. |
| `content` | `String` | The main content of the post. **Required field.** |
| `tags` | `Array<String>` | An array of tags associated with the post. Defaults to an empty array. |
| `author` | `ObjectId` | The identifier of the post's author, referencing the `users` collection. **Required field.** |
| `createdAt` | `Date` | The date and time the post was created. |
| `updatedAt` | `Date` | The date and time the document was last updated. |

---

### 🔎 Moderation Posts Collection

This collection is used to store posts awaiting moderation.

| Field | Data Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | A unique identifier for the moderation document. |
| `post` | `Object` | An embedded document containing the post information for moderation. **Required field.** |
| &nbsp;&nbsp;&nbsp;&nbsp;`title` | `String` | The post's title. **Required field.** |
| &nbsp;&nbsp;&nbsp;&nbsp;`summary` | `String` | The post's summary. |
| &nbsp;&nbsp;&nbsp;&nbsp;`content` | `String` | The main content of the post. **Required field.** |
| &nbsp;&nbsp;&nbsp;&nbsp;`tags` | `Array<String>` | An array of tags. Defaults to an empty array. |
| &nbsp;&nbsp;&nbsp;&nbsp;`author` | `ObjectId` | The author's identifier, referencing the `users` collection. **Required field.** |
| `checks` | `Number` | The number of checks the post has passed. Defaults to `0`. |
| `isRefused` | `Boolean` | Indicates whether the post was refused. Defaults to `false`. |
| `adminMessage` | `String` | An administrator's message about the moderation decision. Defaults to an empty string. |
| `createdAt` | `Date` | The date and time the moderation document was created. |
| `updatedAt` | `Date` | The date and time the document was last updated. |

---

### 🛡 Roles Collection

This collection lists the available roles for users.

| Field | Data Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | A unique identifier for the role. |
| `value` | `String` | The role's name (e.g., "USER", "ADMIN"). Must be unique. Defaults to `"USER"`. |
| `createdAt` | `Date` | The date and time the role was created. |
| `updatedAt` | `Date` | The date and time the document was last updated. |

## 📡 API Endpoints

Here's all app endpoints:

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

## ⚡ Installation
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
