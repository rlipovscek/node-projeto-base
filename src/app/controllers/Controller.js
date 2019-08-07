const express = require("express");

/**
 * Classe contendo toda a lógica comum entre os controllers
 */
class Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    this.router = router;
    this.ROTAS = require("../../config/Routes.enum");
  }

  /**
   * Registra as rotas do controller  na aplicacao
   *
   * @param {string} rota
   * @param {Function} callback funcao registrada como callback da chamada
   */
  registerRouteGet(rota, callback) {
    return this.router.get(rota, callback);
  }
}

module.exports = Controller;
