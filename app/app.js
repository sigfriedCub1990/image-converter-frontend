const path = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

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
app.use(express.static(path.join(__dirname, "public")));

let sessionConfig = {
  secret: "s3cr3t",
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: MongoStore.create({
    mongoUrl: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
  }),
};

if (process.env.NODE_ENV !== "development") {
  sessionConfig.cookie = { secure: true }; // For deploy we MUST use HTTPS
}
app.use(session(sessionConfig));
app.use(flash());

app.use(routes);

// catch 404 and forward to error handler
app.use(function (_, __, next) {
  const err = createError(404);
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
