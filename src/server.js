const express = require("express");
const _path = require("path");
const auth = require("./app/middleware/auth");
const DBO = require("./dbo");
const nunjucks = require("nunjucks");
/**
 * Classe responsavel pela inicializacao e configuracao do servidor
 */
class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    DBO.connect();
    this.initGlobalMiddleware();
    this.initRoutes();
    this.views();
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

  views() {
    nunjucks.configure(__dirname + "/public/views", {
      watch: this.isDev,
      autoescape: false,
      express: this.express
    });
    this.express.use(express.static(_path.resolve(__dirname, "public")));
    this.express.set("view engine", "njk");
  }
}

module.exports = new App().express;
