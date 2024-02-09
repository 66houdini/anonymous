const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const messageRouter = require("./controllers/message");
const usersRouter = require("./controllers/users");


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });


const origin = ["http://localhost:5173", "http://localhost:4173", "https://trinity-anonymous.vercel.app"]
app.use(cors({credentials: true, origin: origin }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/messages", messageRouter);
app.use("/api/logout", logoutRouter);


app.listen(3000, () => {
  console.log("Server started on port 3000");
})