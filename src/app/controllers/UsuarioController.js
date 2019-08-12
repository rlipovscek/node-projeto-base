const express = require("express");
const Controller = require("./Controller");
const Service = require("../services/UsuarioService");

class UsuarioController extends Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRoutePost(this.ROTAS.USUARIOS.SAVE, this.save);
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async save(request, response) {
    try {
      const usuario = request.body;
      const ret = await Service.save(usuario);
      return response.status(201).json(ret);
    } catch (err) {
      return response.status(500).send(err.message);
    }
  }
}

module.exports = UsuarioController;
