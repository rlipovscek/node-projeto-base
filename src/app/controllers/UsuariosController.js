const Controller = require("./Controller");
const express = require("express");
const _path = require("path");
const Service = require("../services/UsuarioService");

class UsuarioController extends Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRouteGet(this.ROTAS.USUARIOS.ALL, this.getAll);
    this.registerRoutePost(this.ROTAS.USUARIOS.SAVE, this.save);
  }

  /**
   * Lista todos os usuários da aplicacao
   * @param {express.Request} req
   * @param {express.Response} resp
   */
  getAll(req, resp) {
    resp.status(200).send(Service.getAll());
  }

  /**
   * salva um usuario
   * @param {express.Request} req
   * @param {express.Response} resp
   */
  async save(req, resp) {
    console.log(req.body);
    if (req.body === {}) {
      return resp.status(400).send("Cliente nao enviado para registro!");
    }
    try {
      const ret = await Service.saveClient(req.body);
      resp.status(201).send(ret);
    } catch (err) {
      resp.status(400).send(err.message);
    }
  }
}

module.exports = UsuarioController;
