const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

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

// Server Starting
module.exports = app;
