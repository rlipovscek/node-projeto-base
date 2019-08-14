const express = require("express");
const Controller = require("./Controller");
const Service = require("../services/ContasService");

class ContasController extends Controller {
  /**
   * Construtor do controller
   * @param {express.Router} router
   */
  constructor(router) {
    super(router);
    this.registerRoutePost(this.ROTAS.CONTAS.INCLUIR, this.incluirConta);
    this.registerRoutePost(
      this.ROTAS.CONTAS.BLOQUEIO_DESBLOQUEIO,
      this.bloquearConta
    );
    this.registerRoutePost(this.ROTAS.CONTAS.ENCERRAR, this.excluirConta);
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async incluirConta(request, response) {
    try {
      console.log("############# incluindo nova conta #############");
      const conta = request.body;
      if (JSON.stringify(conta) === "{}") {
        return response.status(400).send("Conta nao informada!");
      }
      const retorno = await Service.save(request.body);
      return response.status(200).json({
        statusCadastro: "OK",
        descricaoMensagemRetorno: `${conta.protocolo} XPTO`
      });
    } catch (err) {
      console.log("############# erro ao incluir nova conta #############");
      console.error(err);
      return response.status(200).json({
        statusCadastro: "NOK",
        descricaoMensagemRetorno: `${err.message}`
      });
    }
  }

  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async bloquearConta(request, response) {
    try {
      console.log("############# bloqueando conta #############");
      const conta = request.body;
      console.log(conta);
      if (JSON.stringify(conta) === "{}") {
        return response.status(400).send("Conta nao informada!");
      }
      await Service.bloquearConta(request.body);
      return response.status(200).json({
        statusCadastro: "OK",
        descricaoMensagemRetorno: "Blocked/Unblocked"
      });
    } catch (err) {
      console.log("############# erro ao bloquear nova conta #############");
      console.error(err);
      return response.status(200).json({
        statusCadastro: "NOK",
        descricaoMensagemRetorno: `Erro: ${err.message}`
      });
    }
  }

  async excluirConta(request, response) {
    try {
      console.log("############# exluindo conta #############");
      const conta = request.body;
      console.log(conta);
      if (JSON.stringify(conta) === "{}") {
        return response.status(400).send("Conta nao informada!");
      }
      await Service.encerrarConta(conta);
      return response.status(200).json({
        statusCadastro: "OK",
        descricaoMensagemRetorno: ""
      });
    } catch (err) {
      console.log("############# erro ao excluir nova conta #############");
      console.error(err);
      return response.status(200).json({
        statusCadastro: "NOK",
        descricaoMensagemRetorno: `Erro: ${err.message}`
      });
    }
  }
}

module.exports = ContasController;
