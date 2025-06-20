const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// Import your routers and controllers
const AppError = require("./utils/appError");
const tourRouter = require("./routes/tourRoutes");
const globalErrorHandler = require("./controllers/errorController");
const bookingController = require("./controllers/bookingController");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

// --- DATABASE CONNECTION ---
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.DATABASE_URL);
  cachedDb = db;
  console.log("New DB Connection Established");
  return db;
}

// --- GLOBAL MIDDLEWARE ---
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3. Rate Limiting (Note its limitations in a serverless environment)
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Stripe webhook requires the raw body, so it must be before express.json()
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection & XSS
app.use(mongoSanitize());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// --- ROUTES ---
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/booking", bookingRouter);

// --- ERROR HANDLING ---
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

async function handler(req, res) {
  await connectToDatabase();
  return app(req, res);
}

if (process.env.VERCEL) {
  module.exports = handler;
} else {
  module.exports = app;
}
