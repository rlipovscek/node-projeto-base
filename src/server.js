const express = require("express");
const _path = require("path");
const auth = require('./app/middleware/auth');
/**
 * Classe responsavel pela inicializacao e configuracao do servidor
 */
class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.initGlobalMiddleware();
    this.initRoutes();
  }

  /**
   * Inicia os middlewares usados em toda a aplicacao
   */
  initGlobalMiddleware() {
    this.express.use(express.json());
    this.express.use(auth);
  }

  /**
   * Inicia as rotas da aplicacao
   */
  initRoutes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
