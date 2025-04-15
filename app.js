const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const AppError = require("./appError");

// Creating a middleWare
app.use(helmet());
app.use(morgan("dev"));

// Limit the number of requests from a single IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" })); // to parse JSON data

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

app.use(express.static(`${__dirname}/public`)); // to serve static files

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// Mounting routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Server Starting
module.exports = app;
