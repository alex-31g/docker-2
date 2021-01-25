// Значения process.env будут получены из docker-compose файла (поле services.api.environment)
module.exports.port = process.env.PORT;
module.exports.db = process.env.MONGO_URL;
module.exports.apiUrl = process.env.API_URL;
