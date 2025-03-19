const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const ExpressMongoSanitize = require("express-mongo-sanitize");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(ExpressMongoSanitize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
