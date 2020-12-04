const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./route/auth");
const userRoutes = require("./route/user");
const catagoryRoutes = require("./route/catagory");
const productRoutes = require("./route/product");
const braintreeRoutes = require("./route/braintree");
const orderRoutes = require("./route/order");

const movieRoutes = require("./route/movie");

mongoose
  .connect(process.env.MongooseAPI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("suucessfully connected thru env"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 500;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", catagoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

app.use("/api", movieRoutes);

app.listen(PORT, () => console.log(process.env.PORT));
