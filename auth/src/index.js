const express = require("express");
const { connectDB } = require("./helpers/db");
const { host, port } = require("./configuration");
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

// Возвращаем пользователя
app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: "foo@gmail.com",
  });
});
