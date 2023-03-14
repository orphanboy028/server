const express = require("express");
const app = express();
const cors = require("cors");
const UserRoute = require("./routes/userRoutes");
const AdminRoute = require("./routes/adminRoutes");
const globalErrorHandler = require("./utils/errorController");

// BODY PARSER READING data FROM into req.body
app.use(cors({ origin: `${process.env.CLINENT_URL}` }));
app.use(express.json());

// Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/admin", AdminRoute);

// global Error Control
app.use(globalErrorHandler);

module.exports = app;
