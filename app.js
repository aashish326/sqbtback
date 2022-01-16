require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB CONNECTED");
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
