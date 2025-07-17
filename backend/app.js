require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");

const port = 3001;
const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://217.11.167.19'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.static("../frontend/build"));
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}).catch(err => console.error('Ошибка:', err.message));
