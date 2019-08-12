class Config {
  constructor() {
    this.mongooseUrl = `mongodb://teste:mudar123@ds259347.mlab.com:59347/fintech-teste`;
    this.origem = "fathomless-beach-11782";
    this.codigoIdentificacaoFintech = 503;
  }
}

module.exports = new Config();
