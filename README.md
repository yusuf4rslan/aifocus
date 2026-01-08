# 🤖 AIFocus - Premium MERN Blog Platform

> **Discover the Future of Intelligence Today.** A state-of-the-art, high-performance, and visually stunning full-stack blog platform designed for the modern AI era.

![Project Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-61dafb?style=for-the-badge)

---

## 📖 About the Project

**AIFocus** is more than just a blog; it’s a digital sanctuary for technical visionaries. Built with the MERN stack, it provides a seamless writing experience for creators and a fluid, distracted-free exploration environment for readers. The platform bridges the gap between complex AI data structures and elite, minimalist UI/UX design.

---

## 🛠️ Built With

The project is built using a modern and robust technology stack:

*   **Frontend:** ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/axios-671ddf?style=flat-square&logo=axios&logoColor=white)
*   **Backend:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB)
*   **Database:** ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white)
*   **DevOps & Tools:** ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)

---

## ✨ Key Features

*   **🛡️ Secure Authentication:** JWT-based session management with Bcrypt password hashing.
*   **🕵️ Optimized Search:** Server-side optimized, real-time content searching with an advanced debouncing mechanism.
*   **📝 Full CRUD Operations:** Comprehensive dashboard for creating, reading, updating, and deleting articles.
*   **🔒 Protected Routes:** Logic-gate system ensuring only authorized admins can access management panels.
*   **📱 Ultra Responsive:** Flawless experience across devices, from 4K desktops to smartphones.
*   **💎 Elite UI/UX:** A curated interface featuring glassmorphism, smooth animations, and high-end typography.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Atlas or local instance)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yusufarslan/aifocus.git
cd aifocus
```

2. Install Backend dependencies:
```bash
cd backend
npm install
```

3. Install Frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the App
*   **Backend:** `npm run dev` (inside /backend folder)
*   **Frontend:** `npm run dev` (inside /frontend folder)

---

## 🐳 Docker Setup (Recommended)

The easiest way to run AIFocus is using Docker Compose. Make sure you have [Docker](https://www.docker.com/get-started) installed.

1.  **Configure Environment Variables:** Ensure your `.env` files are set up in `/backend` and `/frontend`.
2.  **Run the whole platform:**
    ```bash
    docker-compose up --build
    ```
3.  **Access the Application:**
    -   Frontend: [http://localhost](http://localhost)
    -   Backend API: [http://localhost:5000/api](http://localhost:5000/api)


## 📂 Project Architecture

```bash
aifocus/
├── backend/            # Express.js API Server
│   ├── config/         # DB & General configs
│   ├── controllers/    # Business logic & Route handlers
│   ├── middleware/     # Auth & Error middlewares
│   ├── models/         # Mongoose schemas (User, Post)
│   └── routes/         # API endpoints
└── frontend/           # React - Vite Application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # AuthContext (Global state)
    │   ├── pages/      # View components
    │   └── services/   # Axios API configurations
```

---

## 🔑 Environment Variables

To run this project, add the following variables to your `.env` files:

**Backend (`/backend/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

**Frontend (`/frontend/.env`):**
```env
API_URL=http://localhost:5000/api
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create.
1. **Fork** the Project.
2. Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the Branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.

---

## 📄 License & Contact

Distributed under the **MIT License**.

**Yusuf Arslan**
- GitHub: [@yusufarslan](https://github.com/yusufarslan)
- Email: info@yusufarslan.ai

---
*This documentation has been prepared for the AIFocus platform according to technical standards.*