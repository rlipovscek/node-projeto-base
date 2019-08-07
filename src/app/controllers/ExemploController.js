const express = require("express");
const Controller = require("./Controller");

/**
 * Controller de exemplo
 */
class ExempleController extends Controller {
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

module.exports = ExempleController;
