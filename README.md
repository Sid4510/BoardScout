# BoardScout

BoardScout is a full-stack web application built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. It allows users to **browse, list, and book billboards** efficiently. The platform provides a clean and intuitive interface for discovering billboard availability, managing bookings, and viewing details.

---

## Features

- **Browse Billboards** – Explore available billboards with location, size, and price details.
- **User Authentication** – Login and registration system for secure access.
- **Admin Dashboard** – Manage listings, view bookings, and approve/reject billboard listings.
- **Booking System** – Users can book billboards directly through the platform.
- **Search & Filter** – Filter billboards by city, size, availability, and price.
- **Responsive Design** – Works seamlessly on desktop and mobile devices.
- **Separation of Pages** – Different views for logged-in users and unauthenticated visitors.

---

## Tech Stack

**Frontend:**  
- React.js  
- React Router  
- Axios  
- Tailwind CSS / Bootstrap (if used)  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT Authentication  

**Other Tools:**  
- Postman (for API testing)  
- Git & GitHub for version control  

---

## Screenshots

*(Add screenshots of your app here)*  

- Homepage for unauthenticated users  
- Logged-in dashboard  
- Billboard listing and booking page  

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/BoardScout.git
cd BoardScout
````

2. **Install dependencies for backend**

```bash
cd backend
npm install
```

3. **Install dependencies for frontend**

```bash
cd ../frontend
npm install
```

4. **Setup Environment Variables**

Create a `.env` file in the `backend` folder with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. **Run the application**

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start
```

The application should now be running on `http://localhost:3000`.

---

## Usage

* Visit the homepage to browse billboards.
* Sign up or log in to book a billboard.
* Admin users can add new billboard listings and manage bookings.

---

## API Endpoints

**Authentication:**

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Login user

**Billboards:**

* `GET /api/billboards` – Fetch all billboards
* `POST /api/billboards` – Add a new billboard (Admin only)
* `PUT /api/billboards/:id` – Update a billboard (Admin only)
* `DELETE /api/billboards/:id` – Delete a billboard (Admin only)

**Bookings:**

* `POST /api/bookings` – Book a billboard
* `GET /api/bookings/user/:userId` – Get bookings for a user

---

## Future Enhancements

* Integrate **payment gateway** for booking payments
* Implement **real-time availability updates**
* Add **ratings and reviews** for billboards
* Enable **multi-language support**

---

**Made with ❤️ by Siddhesh Masal**

