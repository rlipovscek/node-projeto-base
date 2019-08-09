const express = require("express");
const Controller = require("./Controller");
const Service = require('../services/ContasService');

class ContasController extends Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRoutePost(this.ROTAS.CONTAS.INCLUIR, this.incluirConta);
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async incluirConta(request, response) {
    try{
        console.log("############# incluindo nova conta #############");
        const conta =  request.body;
        if(JSON.stringify(conta) === '{}'){
            return response.status(400).send("Conta nao informada!");
        }
        const retorno = await Service.save(request.body);
        return response.status(201).json("Conta criada com sucesso!");

    }catch(err){
        console.log("############# erro ao incluir nova conta #############");
        console.error(err);
        return response.status(500).send(err.message);
    }
  }
}

module.exports = ContasController;
