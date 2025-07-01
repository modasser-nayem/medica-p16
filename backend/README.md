# 🩺 Medica - Hospital Management System

The Hospital Management System (Online Only). This system is intended to provide a comprehensive, secure, and user-friendly online platform for patients, doctors, lab technicians, and hospital administrators. The system will streamline healthcare services by offering virtual consultations, electronic prescriptions, lab test coordination, online billing, notifications, and patient support features.

---

## 🌐 Live Demo

- **Backend API**: [https://medica-server.onrender.com](https://medica-server.onrender.com)
- **Frontend**: [https://medica-health.vercel.app](https://medica-health.vercel.app)
- **GitHub Code**: [https://github.com/modasser-nayem/medica-p16](https://github.com/modasser-nayem/medica-p16)

---

## 📑 Table of Contents

- [Documentation](#documentation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Roles & Permissions](#roles--permissions)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)
- [Author](#author)

---

## 📄 Documentation

- **[📘 BRD - Business Requirements Document](https://docs.google.com/document/d/1qOPBECxxBG9FVJI80gdx-XQNFt4Nwas0No2TyJDiCEY/edit?usp=sharing)**
- **[📙 SRS - Software Requirements Specification](https://docs.google.com/document/d/1i1aUojf82BIOXUkFl_OiKNUviKq0UKajvnPdoR4v6uY/edit?usp=sharing)**
- **[📬 API endpoints documentation]()**

---

## 🚀 Features

- 🧾 **User Authentication & Authorization (JWT)**
- 🐳 **Dockerized for Deployment**
- 🧪 **Unit & Integration Testing with Jest & supertest**
- 🔐 **Secure Password Hashing, Rate Limiting & Error Handling**

---

## 🛠️ Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Language         | TypeScript             |
| Frameworks       | Node.js, Express.js    |
| Databases        | PostgreSQL             |
| Auth             | JWT, Bcrypt            |
| ORM              | Prisma                 |
| Validation       | Zod                    |
| CI/CD            | GitHub Actions         |
| Containerization | Docker, Docker Compose |
| Documentation    | Postman                |
| Notification     | Nodemailer             |
| Payment          | Stripe Integration     |
| Testing          | Jest, Supertest        |

---

<p align="right"><a href="#readme-top">back to top</a></p>

## 🧱 Architecture Overview

The backend follows a layered, modular architecture with:

- **Clean code structure**
- **Separation of concerns**
- **Zod-based DTO validation**
- **Role-based middleware**
- **Global error handling**
- **Logger (Winston)**

---

## 👥 Roles & Permissions

| Role | Capabilities |
| ---- | ------------ |
|      |              |
|      |              |
|      |              |

---

## 📬 API Endpoints

> Base URL: `https://medica-server.onrender.com/api/v1`

- **API Documentation (postman)**: []()

---

<p align="right"><a href="#readme-top">back to top</a></p>

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/modasser-nayem/medica-p16.git

cd medica-p16

cd backend

yarn install

cp .env.example .env

yarn prisma migrate deploy

yarn prisma generate

yarn dev # Make sure PostgreSQL are running. And also add all .env variable
```

---

## 🧪 Scripts

```bash
# Run in development mode
yarn dev


# Run tests
yarn test

# Build for production
yarn build

# Run in production mode
yarn start

# Format code
yarn format

# Lint code
yarn lint
```

---

## 📦 Deployment

Server hosted on Render

CI/CD managed via GitHub Actions

Dockerized infrastructure with support for docker-compose

---

## 🪪 License

This project is licensed under the MIT License.

---

## 📣 Author

#### Ali Modasser Nayem

🔗 [Portfolio](https://alimodassernayem.vercel.app/) | [GitHub](https://github.com/modasser-nayem) | [LinkedIn](https://www.linkedin.com/in/alimodassernayem/)

Email: [modassernayem@gmail.com](modassernayem@gmail.com)

---

<p align="right"><a href="#readme-top">back to top</a></p>
