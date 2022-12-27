const path = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const logger = require("./logger");
const routes = require("./routes");

require("./database");
require("./models");

const app = express();

app.use(logger);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// catch 404 and forward to error handler
app.use(function (_, __, next) {
  const err = createError(404);
  console.log(`Status is: ${err.status}`);
  next(err);
});

// error handler
// eslint-disable-next-line
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { message: err.message, error: err });
});

module.exports = app;
