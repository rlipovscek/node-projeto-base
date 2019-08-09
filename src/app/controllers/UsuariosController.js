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
    this.registerRouteGet(this.ROTAS.USUARIOS.GET_BY_CNPJ, this.getByCNPJ);
    this.registerRoutePost(this.ROTAS.USUARIOS.SAVE, this.save);
  }

  /**
   * Lista todos os usuários da aplicacao
   * @param {express.Request} req
   * @param {express.Response} resp
   */
  async getAll(req, resp) {
    try{
      console.log("####### Buscando todos os usuarios ########");
      const usuarios = await Service.getAll();
      if(usuarios && usuarios.length > 0 ){
        resp.status(200).send(usuarios);
      }else{
        return resp.send(204).json(usarios);
      }
    }catch(err){
      resp.send(500).send(err.message);
    }
  }

  /**
   * salva um usuario
   * @param {express.Request} req
   * @param {express.Response} resp
   */
  async save(req, resp) {
    console.log(`########## Salvando usuario ##########`)
    if (JSON.stringify(req.body) === '{}') {
      return resp.status(400).send("Cliente nao enviado para registro!");
    }
    try {
        const {cnpj} = req.body;
        const cliente = await Service.getByCnpj(cnpj);
        if(cliente){
            return resp.status(400).send(`cliente de documento ${cnpj} ja registrado`);
        }
      const ret = await Service.saveClient(req.body);
      resp.status(201).send(ret);
    } catch (err) {
      resp.status(400).send(err.message);
    }
  }


    /**
   * Recupera um usuario
   * @param {express.Request} req
   * @param {express.Response} resp
   */
  async getByCNPJ(req, resp) {
    const {cnpj} = req.params;
    console.log(`########## Buscando usuario ${cnpj} ##########`)
    try {
        const cliente = await Service.getByCnpj(cnpj);
      resp.status(200).send(cliente);
    } catch (err) {
      resp.status(500).send(err.message);
    }
  }
}

module.exports = UsuarioController;
