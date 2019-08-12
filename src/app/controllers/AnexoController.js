const express = require("express");
const Controller = require("./Controller");
const Service = require("../services/AnexoService");

class AnexoController extends Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRoutePost(this.ROTAS.ANEXOS.SAVE, this.save);
    this.registerRouteGet(this.ROTAS.ANEXOS.GET, this.get);
    this.registerRouteGet(this.ROTAS.ANEXOS.GET_ALL, this.getAll);
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async save(request, response) {
    try {
      const anexo = request.body;
      const { documento } = request.params;
      anexo.documento = documento;
      if (JSON.stringify(anexo) === `{}`) {
        return response.status(400).send("Anexo nao informado!");
      }
      const ret = await Service.save(anexo);
      return response.status(201).json(ret);
    } catch (err) {
      return response.status(500).json(err.message);
    }
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async get(request, response) {
    try {
      const { documento, id } = request.params;
      const ret = await Service.getById(id, documento);
      if (ret) {
        return response.status(200).json(ret);
      } else {
        return response.status(204).send();
      }
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async getAll(request, response) {
    try {
      const { documento } = request.params;
      const ret = await Service.getByDocumento(documento);
      if (ret) {
        return response.status(200).json(ret);
      } else {
        return response.status(204).send();
      }
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }
}

module.exports = AnexoController;
