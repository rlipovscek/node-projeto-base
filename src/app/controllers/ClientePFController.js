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
    this.registerRouteGet(this.ROTAS.CLIENTES_PF.GET_BY_CPF, this.recuperarPorDocumento);
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

  /**
   * 
   * @param {express.Request} request 
   * @param {express.Response} response 
   */
  async recuperarPorDocumento(request,response){
    try {
        const {cpf} = request.params;
        const cliente = await ClientePFService.getByCPF(cpf);
        return response.status(200).json(cliente);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
}

module.exports = ClientePFController;