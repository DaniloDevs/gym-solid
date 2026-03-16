# Gympass Style App

## 💻 Description
A robust Node.js backend application for a Gympass-style system. The project is heavily built around **SOLID principles**, applying **Design Patterns** (such as Factory and Repository architectures), and strictly following **Test-Driven Development (TDD)**. 

## 🚀 Technologies

This project uses the following modern stack:
- **Node.js**: JavaScript Runtime
- **Fastify**: High-performance web framework
- **Prisma**: Next-generation TypeScript ORM
- **PostgreSQL**: Relational Database (via Docker)
- **Vitest**: Blazing-fast unit and end-to-end testing framework
- **Zod**: TypeScript-first schema validation
- **TypeScript**: Static typing for safer code
- **JWT**: JSON Web Tokens for secure authentication

## ⚙️ Features

### Users
- [x] Register a new user
- [x] Authenticate user (Login)
- [x] Retrieve authenticated user profile
- [x] View user check-in metrics (total count)

### Gyms
- [x] Register a new gym
- [x] Search gyms by name/title
- [x] Fetch nearby gyms (within a 10km radius)

### Check-ins
- [x] User can check-in at a gym
- [x] Fetch check-in history for a user
- [x] Validate a user's check-in (Admin only rule)

## 🏗️ Architecture & Patterns

The application structure separates concerns into discrete layers:
- **Controllers Layer (`src/http`)**: Handles incoming REST requests, data validation, and HTTP responses.
- **Services/Use Cases Layer (`src/services`)**: Contains the core business logic, decoupled from the framework and database.
- **Repository Pattern (`src/repositories`)**: Abstracts data persistence. It utilizes **In-Memory** repositories for blazing-fast Unit Tests, and **Prisma** repositories for production/E2E testing.
- **Factory Pattern (`src/services/factories`)**: Encapsulates the instantiation logic of use cases alongside their specific repository dependencies.

## 🛡️ Role-Based Access Control (RBAC)
The application handles permissions based on roles (`ADMIN` vs. `MEMBER`). Certain routes, such as validating a check-in or creating a new gym, are strictly accessible only to `ADMIN` users.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (package manager)
- Docker & Docker Compose (for the database)

### Installation

1. Clone the repository and navigate into the project folder.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your environment variables by copying the example file:
   ```bash
   cp .env.exemple .env
   ```
   *(Make sure to adjust your `DATABASE_URL` and `JWT_SECRET` if necessary)*

4. Start the PostgreSQL database using Docker Compose:
   ```bash
   docker-compose up -d
   ```
5. Run Prisma database migrations:
   ```bash
   npx prisma migrate dev
   ```

### Running the Application

To start the development server:
```bash
pnpm run dev
```

### Running Tests

The application features comprehensive test coverage separated into Unit and E2E dimensions.

- **Run all unit tests:**
  ```bash
  pnpm run test
  ```
- **Run unit tests in watch mode:**
  ```bash
  pnpm run test:watch
  ```
- **Run test coverage report:**
  ```bash
  pnpm run test:covarege
  ```
- **Run End-to-End (E2E) tests:**
  ```bash
  pnpm run test:e2e
  ```
