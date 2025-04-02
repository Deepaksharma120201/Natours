const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((res) => console.log("DB connection successful."));

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
