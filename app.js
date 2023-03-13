const express = require("express");
const app = express();
const cors = require("cors");
const UserRoute = require("./routes/userRoutes");
const globalErrorHandler = require("./utils/errorController");

// BODY PARSER READING data FROM into req.body
app.use(cors({ origin: `${process.env.CLINENT_URL}` }));
app.use(express.json());

// Routes
app.use("/api/v1/user", UserRoute);

// global Error Control
app.use(globalErrorHandler);

module.exports = app;
