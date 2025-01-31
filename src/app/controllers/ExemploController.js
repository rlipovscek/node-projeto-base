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
    this.registerRouteGet(this.ROTAS.CONTEXTO, this.teste);
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  teste(request, response) {
    return response.render("login/login");
  }
}

module.exports = ExempleController;
