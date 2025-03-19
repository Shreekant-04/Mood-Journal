require("dotenv").config();
require("./config/db");
const app = require("./app");

const email = require("./utils/email");

const user = {
  name: "Shreekant",
  email: "abc@a.com",
};
const mail = new email(user, "abc.com");
mail.verifyTransport();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
