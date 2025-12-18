Debox – MERN Backend & Frontend

Debox is a full-stack MERN application with authentication, role-based access, products, categories, inventory management, and CSV upload support.
The backend is built using Node.js, Express, TypeScript, MongoDB, and the frontend uses React + Vite + Tailwind CSS.
Both are deployed on Render.

🚀 Live Demo

Frontend:
👉 https://debox-frontend.onrender.com

Backend API:
👉 https://debox-backend-cg8v.onrender.com

🧱 Tech Stack
Backend

Node.js

Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

bcryptjs (password hashing)

Multer (CSV upload)

Render (deployment)

Frontend

React (Vite)

TypeScript

Tailwind CSS

Axios

React Router

Render (static site hosting)



Authentication Flow

User logs in using email & password

Backend validates credentials

JWT token is generated and returned

Token is stored on frontend

Protected routes use JWT for authorization

🌐 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Products
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

Categories
GET    /api/categories
POST   /api/categories

Inventory
GET    /api/inventory
POST   /api/inventory

CSV Upload
POST /api/upload

⚙️ Environment Variables
Backend (.env)
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Frontend (Render Environment Variables)
VITE_API_URL=https://debox-backend-cg8v.onrender.com

🛠️ Local Setup
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🚢 Deployment (Render)
Backend (Web Service)

Build Command

npm install && npm run build


Start Command

npm run start

Frontend (Static Site)

Build Command

npm install && npm run build


Publish Directory

dist

✅ Key Deployment Notes

Backend listens on process.env.PORT

Frontend API calls use Axios base URL with /api

Environment variables are injected at build time

No nodemon used in production
