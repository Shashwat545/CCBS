require("dotenv").config();
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const app = express();

const authRouter = require("./routes/authRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const SECRET_KEY = process.env.CCBS_SECRET_KEY;
const MONGO_URL = process.env.mongo_url;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

// Session storage configuration
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      dbName: "sessions",
    }),
    cookie: {
      // 10 minutes age for cookies, debug setting
      maxAge: 10 * 60 * 1000,
      secure: app.get("env") === "production",
    },
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bookings", bookingRouter);

module.exports = app;
