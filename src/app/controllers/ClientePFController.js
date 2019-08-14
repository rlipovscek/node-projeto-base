const express = require("express");
const Controller = require("./Controller");
const ClientePFService = require("../services/ClientePFService");


class ClientePFController extends Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRoutePost(this.ROTAS.CLIENTES_PF.SAVE, this.salvarCliente);
  }
  /**
   * 
   * @param {express.Request} request 
   * @param {express.Response} response 
   */
  async salvarCliente(request,response){
      try {
          await ClientePFService.salvarCliente(request.body);
          return response.status(200).json();
      } catch (error) {
          return response.status(500).json(error.message);
      }
  }
}

module.exports = ClientePFController;