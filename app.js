const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const AppError = require("./appError");

// Creating a middleWare
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // to serve static files

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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
