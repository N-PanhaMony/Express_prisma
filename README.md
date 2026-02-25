# Express + Prisma Blog API

A RESTful API built with **Express**, **Prisma**, and **PostgreSQL** for managing posts, tags, and comments. Includes **JWT authentication**, **Zod request validation**, and ready-to-use **VSCode REST Client requests** for testing.

---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Database](#database)  
- [API Endpoints](#api-endpoints)  
- [Validation](#validation)  
- [Testing with VSCode REST Client](#testing-with-vscode-rest-client)  
- [Usage Example with cURL](#usage-example-with-curl)  
- [License](#license)  

---

## Features

- User registration & login with JWT authentication
- CRUD operations for **Posts**, **Tags**, and **Comments**
- Request validation using **Zod**
- Role-based authorization (ADMIN vs regular user)
- Dynamic REST Client requests for testing
- PostgreSQL database powered by Prisma ORM

---

## Project Structure

```

express-prisma-local/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── src/
│   ├── Controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── tagController.js
│   │   └── commentController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── tagRoutes.js
│   │   └── commentRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validateRequest.js
│   ├── validator/
│   │   └── postValidator.js
│   ├── config/
│   │   └── prisma.js
│   └── server.js
├── requests.http
├── package.json
└── README.md

```

---

## Getting Started

1. **Clone the repository:**

```bash
git clone <repository-url>
cd express-prisma-local
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up your `.env` file:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

4. **Run database migrations and seed (optional):**

```bash
npx prisma migrate dev
node prisma/seed.js
```

5. **Start the server:**

```bash
npm run dev
```

Server should run on `http://localhost:3000`.

---

## Database

**Prisma Models**:

* **User**
  Fields: `id`, `name`, `email`, `password`, `role`

* **Post**
  Fields: `id`, `title`, `slug`, `content`, `published`, `authorId`
  Relations: `author -> User`, `tags -> Tag[]`, `comments -> Comment[]`

* **Tag**
  Fields: `id`, `name`
  Relations: `posts -> Post[]`

* **Comment**
  Fields: `id`, `content`, `postId`, `userId`
  Relations: `post -> Post`, `user -> User`

---

## API Endpoints

### Auth

* **POST /auth/register** – Register new user
* **POST /auth/login** – Login and receive JWT token

### Posts

* **GET /posts** – Get all posts
* **POST /posts** – Create a new post (JWT required)
* **DELETE /posts/:id** – Delete a post (JWT required; only author or ADMIN)

### Tags

* **GET /tags** – Get all tags
* **POST /tags** – Create a new tag (JWT required)

### Comments

* **GET /comments** – Get all comments
* **POST /comments** – Create a comment on a post (JWT required)

---

## Validation

* **Posts**

  * `title`: string, 5–100 characters
  * `content`: string, min 20 characters
  * `published`: boolean (optional)
  * `tagIds`: array of UUID strings (optional)

* **Validation implemented using [Zod](https://github.com/colinhacks/zod)**

---


