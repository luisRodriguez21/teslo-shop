# Teslo Shop API

E-commerce REST API built with **NestJS**, **TypeORM** and **PostgreSQL**. It covers the backend of an online clothing store: authentication with roles, a product catalog with images, file uploads, seed data and a real-time WebSocket channel.

## Features

- **Auth:** sign-up and login with hashed passwords, JWT strategy, custom `@Auth()` decorator and role guard (`admin`, `super-user`, `user`)
- **Products:** CRUD with TypeORM entities and relations (product ↔ images), slugs, sizes, tags, pagination and search by id, slug or title
- **Files:** image upload with type filtering and unique file names, served from `/api/files/product/:imageName`
- **Seed:** `GET /api/seed` resets the database with demo users and products
- **WebSockets:** Socket.IO gateway authenticated with JWT that tracks connected clients and broadcasts messages
- **Validation and docs:** global `ValidationPipe` with DTOs and Swagger UI at `/api`

## Tech stack

NestJS · TypeScript · TypeORM · PostgreSQL · Passport JWT · bcrypt · Socket.IO · Swagger · Docker Compose

## Getting started

```bash
git clone https://github.com/luisRodriguez21/teslo-shop.git
cd teslo-shop
yarn install

cp .env.template .env     # fill in PORT, DB_* and JWT_SECRET
docker compose up -d      # PostgreSQL
yarn start:dev
```

Then load demo data with `GET http://localhost:3000/api/seed` and open the docs at `http://localhost:3000/api`.
