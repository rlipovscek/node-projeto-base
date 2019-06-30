const express = require("express");
const Controller = require("./Controller");

/**
 * Controller de exemplo
 */
class HomeController extends Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRoute(this.ROTAS.CONTEXTO.ROUTE, this.teste);
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  teste(request, response) {
    return response.send("iniciando um novo app");
  }
}

/**
 * Recebe o modulo de rotas usado na aplicacao, e deveolve uma instancia do
 * controller
 */
module.exports = router => {
  return new HomeController(router);
};
