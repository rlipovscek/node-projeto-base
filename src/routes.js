const express = require("express");
const fs = require("fs");
const path = require("path");

/**
 * Inicia a instancia de rotas que sera usasda pelo constrollers para registrar
 * as rotas
 */
class Routes {
  /**
   * Inicia as rotas da aplicacao
   */
  constructor() {
    this.router = express.Router();
    this.initControllers();
  }

  /**
   * Lista todos os arquivos criados dentro de app/controllers e
   * inicializa o controller de cada arquivo encontrado
   *
   */
  async initControllers() {
    // define o caminho onde os controllers da aplicacao se encontram
    const caminho = path.join(__dirname, "app", "controllers");
    // lista os controllers da aplicacao
    const controllers = await fs.readdirSync(caminho);
    // caso encontre algum controller
    if (controllers && controllers.length > 0) {
      controllers.forEach(controller => {
        // Inicializa a rota dos controllers, exceto do arquivo Controller.js
        // que eh a classe que os outros controllers estendem
        if (controller.toLowerCase() !== "controller.js") {
          this.initRoute(`${caminho}/${controller.replace(".js", "")}`);
        }
      });
    }
  }

  /**
   * Inicializa a instancia de um controller, e suas configuracoes de rotas
   * @param {string} path caminho do controller a ser iniciado
   */
  initRoute(path) {
    try {
      let clazz = require(path);
      new clazz(this.router);
    } catch (err) {
      console.log(err)
      console.log(`path ${path} nao encontrada!
      Verifique o caminho para a inicializacao correta do path`);
    }
  }
}

module.exports = new Routes().router;
