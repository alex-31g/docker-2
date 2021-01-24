const express = require("express");
const axios = require("axios");
const { connectDB } = require("./helpers/db");
const { host, port, apiUrl } = require("./configuration");
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`started auth service at ${port} port`);
  });
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
  res.send("auth server is working");
});

// Обращение к этому url будет происходить из api-сервиса
// Возвращаем пользователя
app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: "foo@gmail.com",
  });
});

// Когда возникает запрос http://localhost:3002/testwithapidata к auth-сервису
// для получения данных, сперва нужно выполнить запрос к api-сервису,
// дождаться его ответа, и потом возвратить данные
app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + "/testapidata").then((response) => {
    res.json({
      testapidata: response.data.testwithapi,
    });
  });
});
