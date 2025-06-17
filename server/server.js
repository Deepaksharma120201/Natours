const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });

const app = require("./app");

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((res) => console.log("DB connection successful."));

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Sutting Down...");
  server.close(() => {
    process.exit(1);
  });
});
