const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✔ Database connection successful");
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err);
  });
