const express = require("express");
const app = express();

// Значение PORT будет получено из docker-compose файла
const port = process.env.PORT;

app.get("/test", (req, res) => {
  res.send("api server is working");
});

app.listen(port, () => {
  console.log(`started api service at ${port} port`);
});
