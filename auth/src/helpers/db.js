const mongoose = require("mongoose");
const { db } = require("../configuration");

// Соединяется с БД и возвращает соединение
module.exports.connectDB = () => {
  mongoose.connect(db, { useNewUrlParser: true });

  return mongoose.connection;
};
