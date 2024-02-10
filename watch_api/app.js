const express = require('express')
const errorMiddleware = require("./middlewares/error")

const app = express()
const dotenv = require('dotenv');

//config env
dotenv.config({ path: "watch_api/config/config.env" })

app.use(express.json());

// Route Imports
const watchRoute = require("./routes/watchRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/api/v1", watchRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//middleware for error
app.use(errorMiddleware)

module.exports = app