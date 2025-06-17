const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const app = express();

const AppError = require("./utils/appError");
const tourRouter = require("./routes/tourRoutes");
const mainRouter = require("./routes/mainRoutes");
const globalErrorHandler = require("./controllers/errorController");
const bookingController = require("./controllers/bookingController");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Creating a middleWare
app.use("/img", express.static(path.join(__dirname, "../client/public/img")));

app.use(helmet());
app.use(morgan("dev"));

// Limit the number of requests from a single IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

app.use("/api", limiter);
app.use(express.json({ limit: "10kb" })); // to parse JSON data
app.use(cookieParser());

// For security purposes
// Data sanitization against NoSQL query injection
// Prevent parameter pollution
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

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mounting routes
app.use("/", mainRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/booking", bookingRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Server Starting
module.exports = app;
