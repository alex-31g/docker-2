const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { connectDB } = require("./helpers/db");
const { host, port, authApiUrl } = require("./configuration");
const { response } = require("express");
const app = express();

// =========================
// Создаем Schema
const postSchema = new mongoose.Schema({
  name: String,
});

// На базе Schema - создаем модель.
// Все экземпляры данной модели будут иметь методы для
// работы с базой данных, а также уникальные id
const Post = mongoose.model("Post", postSchema);
// =========================

const startServer = () => {
  app.listen(port, () => {
    console.log(`started api service at ${port} port`);
  });

  // =========================
  // На базе модели Post - создаем экземпляр
  const silence = new Post({ name: "Silence" });

  // Если мы посмотрим в консоль на объект silence, мы увидим
  // не только поле silence, но и поле _id, которое
  // mongoose добавил самостоятельно
  console.log("silence =====>", silence);

  // save - сохранение объекта в БД
  silence.save((err, savedPost) => {
    if (err) return console.log(err);
    console.log("savedPost =====>", savedPost);
  });

  // find - поиск всех постов в БД
  Post.find((err, posts) => {
    if (err) return console.log(err);
    console.log("post =====>", posts);
  });
  // =========================
};

// Сперва выполняется соединение с базой данных
// Если ошибка - выводим её в консоль
// Если disconnected - выполняем повторное соединение
// Если соединение успешно установлено - запускаем сервер (метод startServer)
connectDB()
  .on("error", console.log)
  .on("disconnected", connectDB)
  .once("open", startServer);

app.get("/test", (req, res) => {
  res.send("api server is working");
});

// Когда возникает запрос http://localhost:3001/testwithcurrentuser к api-сервису
// для получения данных, сперва нужно проверить авторизирован пользователь или нет.
// Для этого api-сервис выполняет запрос к auth-сервису, дожидается его ответа, и потом возвращает данные
app.get("/testwithcurrentuser", (req, res) => {
  // api-сервис выполняет запрос к auth-сервису
  axios.get(authApiUrl + "/currentUser").then((response) => {
    // Дождавшись ответа - возвращаем данные
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
    });
  });
});
