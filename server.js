require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const expressEJSLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDBStore = require("connect-mongo");
const passport = require("passport");

// Database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.on("connected", function () {
  console.log("backend services are running (MongoDB)");
});
connection.on("disconnected", function () {
  console.log("backend services aren't running (MongoDB)");
});
connection.on("error", console.error.bind(console, "connection error:"));
module.export;

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDBStore.create({
      collectionName: "sessions",
      client: connection.getClient(),
    }),
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// Assests config
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Global Middlewares config
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// Routes config
require("./routes/web")(app);

// Template engine config
app.use(expressEJSLayouts);
app.set("views", path.join(__dirname, "./resources/views"));
app.set("view engine", "ejs");

// Server config
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
