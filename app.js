const express = require("express");
const app = express();
const cors = require("cors");
const UserRoute = require("./routes/userRoutes");
const AdminRoute = require("./routes/adminRoutes");
const CategoriesRoute = require("./routes/categoryRoutes");
const ProdutcsRoute = require("./routes/ProductsRoute");
const globalErrorHandler = require("./utils/errorController");

// BODY PARSER READING data FROM into req.body
app.use(cors({ origin: `${process.env.CLINENT_URL}` }));
app.use(express.json());

// Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/categories", CategoriesRoute);
app.use("/api/v1/produts", ProdutcsRoute);

// global Error Control
app.use(globalErrorHandler);

module.exports = app;
