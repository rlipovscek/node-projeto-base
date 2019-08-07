const Controller = require('./Controller');
const express = require('express');
const _path = require('path');
const Service = require('../services/UsuarioService');

class UsuarioController extends Controller{
    /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRouteGet(this.ROTAS.USUARIOS.ALL, this.getAll);
  }

  /**
   * Lista todos os usuários da aplicacao
   * @param {express.Request} req 
   * @param {express.Response} resp 
   */
  getAll(req, resp){
          resp.status(200).send(Service.getAll());
  }

}

module.exports = UsuarioController;