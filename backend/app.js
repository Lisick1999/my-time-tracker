require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");

const port = 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static("../frontend/build"));
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
});
