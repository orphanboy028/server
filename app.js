const express = require("express");
const app = express();
const cors = require("cors");
const UserRoute = require("./routes/userRoutes");
const AdminRoute = require("./routes/adminRoutes");
const CategoriesRoute = require("./routes/categoryRoutes");
const globalErrorHandler = require("./utils/errorController");

// BODY PARSER READING data FROM into req.body
app.use(cors({ origin: `${process.env.CLINENT_URL}` }));
app.use(express.json());

// Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/categories", CategoriesRoute);

// global Error Control
app.use(globalErrorHandler);

module.exports = app;
