# TaskTarget

A full-stack task management application built with **React, Node.js, Express, and MongoDB** featuring secure authentication and a personal task dashboard.

---

## Features

- User registration, login, and logout  
- JWT-based authentication (httpOnly cookies)  
- User profile with avatar  
- Create, complete, and delete tasks  
- Change password  
- Protected dashboard  

---

## Tech Stack

- Frontend: React, Vite, Tailwind CSS  
- Backend: Node.js, Express  
- Database: MongoDB Atlas  
- Authentication: JWT  
- File Uploads: Multer  

---

## API Endpoints

### Auth
- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/logout`
- `GET /api/users/me`
- `POST /api/users/change-password`

### Tasks
- `POST /api/tasks`
- `GET /api/tasks`
- `PATCH /api/tasks/:id/toggle`
- `DELETE /api/tasks/:id`

---

## How to Run

### Backend
- cd backend
- npm install
- create a .env file
- npm run dev


### Frontend
- cd frontend
- npm install
- npm run dev


---

## Included in Repository

- Full frontend & backend source code  
- `logs.txt` (backend execution logs)  


 ## Postman Collection:
 https://sujal19soni2004-9762870.postman.co/workspace/Sujal-Soni's-Workspace~0633aad7-986f-46e7-8c40-35bbb217142e/request/50819725-99573e64-c3d9-47ed-b965-5df0e0081753?action=share&creator=50819725&ctx=documentation&active-environment=50819725-abd40b3d-cb3e-418c-81db-b85c607df46c

---

## Note on Frontend–Backend Scalability
- The application is designed with a clear separation between frontend and backend, allowing both to scale independently. The frontend communicates with the backend through RESTful APIs, making it easy to deploy the UI on a CDN (such as Vercel or Netlify) while running the backend on scalable cloud infrastructure.

- Authentication is handled using stateless JWT tokens stored in httpOnly cookies, which allows the backend to be horizontally scaled without requiring server-side session storage. MongoDB Atlas supports horizontal scaling and indexing, ensuring efficient data access as the number of users grows.

- The API structure is resource-based (/users, /tasks), making it easy to add features such as pagination, filtering, and caching. This design supports future integration with load balancers, caching layers (e.g., Redis), and microservices if needed.

## Author

Built as part of a **Frontend Developer Intern assignment at Primetrade.ai**.


