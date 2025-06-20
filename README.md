# 🌄 Wildway - Adventure Tour Booking App

Wildway is a full-stack adventure tour booking platform where users can browse tours, view detailed itineraries, and book their next adventure. Built with the MERN stack and powered by Stripe for secure payments, it offers an immersive and seamless user experience from discovery to checkout.

<!-- ## 🚀 Demo

👉 **[Visit this link see the live demo]()** -->

## 🚀 Core Features

- 🔐 **Authentication & Authorization:** Secure JWT-based authentication with role-based access control (user, admin). Includes signup, login, password reset, and profile updates.
- 🗺️ **Interactive Map:** Tours displayed on an interactive map (e.g., using Mapbox or Leaflet).
- 📸 **Rich Tour Showcase:** Dynamic tour pages with image galleries, detailed itineraries, reviews, and booking information.
- 💳 **Secure Payment Gateway:** Seamless and secure payment processing using the Stripe Checkout API.
- 📦 **Booking Management:** Authenticated users can book tours, view their booking history, and manage their profile information.
- ⚙️ **Admin Dashboard:** (Optional) A dedicated interface for admins to manage tours, users, and bookings.
- 🖼️ **Static Asset Serving:** Tour images and other assets are efficiently served from the client-side public directory.
- 🌐 **Clean Architecture:** Well-defined separation of concerns between the backend (`server/`) and frontend (`client/`).
- 🗺️ **Interactive Maps**\
  Tours are visualized on an interactive map using OpenStreetMap for geolocation context.

## 🛠️ Tech Stack

| Category     | Technology                                                                                                                                                                                                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7FC64A?style=for-the-badge&logo=openstreetmap&logoColor=white) |
| **Backend**  | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)                                                                                                                         |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)                                                                                                                              |
| **Payments** | ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)                                                                                                                                                                                                                                             |
| **Auth**     | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)                                                                                                                                                                                                                                            |

## 🧱 Project Structure

The project maintains a monorepo structure with a clear separation between the client and server applications.

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance)

## ⚙️ Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Deepaksharma120201/Wildway
    cd wildway
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install --prefix server
    ```

3.  **Install frontend dependencies:**

    ```bash
    npm install --prefix client
    ```

4.  **Configure Environment Variables:**

    - In the `server/` directory, create a `.env` file by copying `.env.example` (if available) or creating it from scratch. See the **Environment Variables** section below for details.
    - In the `client/` directory, create a `.env` file for your Stripe public key.

5.  **Run the application:**
    For the best development experience, run both the client and server concurrently in two separate terminals.
    - **Run the backend server:** (from `/server`)
      ```bash
      npm run start:dev
      ```
    - **Run the frontend client:** (from `/client`)
      ```bash
      npm start
      ```

> The client will open on `http://localhost:3001` (or another port if busy) and the server will run on `http://localhost:3000`.

## 🔑 Environment Variables

### Server (`server/.env`)

| Variable                | Description                                       | Example Value                          |
| ----------------------- | ------------------------------------------------- | -------------------------------------- |
| `NODE_ENV`              | Application environment.                          | `development`                          |
| `PORT`                  | Port for the backend server.                      | `3000`                                 |
| `DATABASE_LOCAL`        | Local MongoDB connection string.                  | `mongodb://localhost:27017/wildway`    |
| `JWT_SECRET`            | A long, random string for signing JWTs.           | `a-very-long-and-secure-random-string` |
| `JWT_EXPIRES_IN`        | Expiration time for JWTs.                         | `90d`                                  |
| `JWT_COOKIE_EXPIRES_IN` | Expiration time for the JWT cookie (in days).     | `90`                                   |
| `STRIPE_SECRET_KEY`     | Your Stripe secret key (from Stripe Dashboard).   | `sk_test_...`                          |
| `STRIPE_WEBHOOK_SECRET` | Secret for verifying Stripe webhook events.       | `whsec_...`                            |
| `EMAIL_USERNAME`        | Username for your email service (e.g., Mailtrap). | `your-email-username`                  |
| `EMAIL_PASSWORD`        | Password for your email service.                  | `your-email-password`                  |
| `EMAIL_FROM`            | The "from" address for outgoing emails.           | `Wildway <hello@wildway.io>`           |

### Client (`client/.env`)

| Variable                      | Description                                          | Example Value |
| ----------------------------- | ---------------------------------------------------- | ------------- |
| `REACT_APP_STRIPE_PUBLIC_KEY` | Your Stripe publishable key (from Stripe Dashboard). | `pk_test_...` |

## 📚 API Endpoints Overview

### Tours

- `GET /api/v1/tours` - Get all tours
- `GET /api/v1/tours/:id` - Get a single tour by ID
- `POST /api/v1/tours` - Create a new tour (Admin)

### Users & Authentication

- `POST /api/v1/users/signup` - Register a new user
- `POST /api/v1/users/login` - Log in a user
- `GET /api/v1/users/me` - Get current user's profile

## Bookings

- `GET /api/v1/booking/checkout-session/:tourId` - Creates a Stripe checkout session for a tour.
- `POST /webhook-checkout` - Stripe webhook to finalize a booking after successful payment.
- `GET /api/v1/bookings/my-tours` - Get all bookings for the currently logged-in user.

## 📄 License

This project is licensed under the **MIT License** — free to use for personal or commercial projects.

## 🙋‍♂️ Author

Made with ❤️ by [Deepak Sharma](https://github.com/Deepaksharma120201).  
If you like this project, give it a ⭐ and share it!

> Happy Adventuring! 🌍
