const _mongoose = require("mongoose");
const Config = require("./config/config");

class DBO {
  async connect() {
    console.log("Connectando ao banco de dados");
    try {
      const ret = await _mongoose.connect(Config.mongooseUrl, {
        useNewUrlParser: true
      });
    } catch (err) {
      console.log("Erro ao se conectar ao banco de dados!");
      console.error(err);
    }
  }
}

module.exports = new DBO();
