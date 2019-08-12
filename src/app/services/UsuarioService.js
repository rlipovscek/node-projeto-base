const Usuario = require("../models/Usuario");
const LOG = require("./LogService");
const bcrypt = require("bcrypt");
const SALTS = 8;

class UsuarioService {
  /**
   * Registra um usuario para acessar o sistema
   *
   * @param {Usuario} usuario
   *
   */
  async save(usuario) {
    try {
      console.log("######## inserindo usuario na base ###########");
      if (JSON.stringify(usuario) === "{}") {
        throw new Error(`Usuario nao informado`);
      }
      usuario.password = await bcrypt.hash(usuario.password, SALTS);
      console.log(`novo password`, usuario.password);
      const user = new Usuario(usuario);
      let msgError;
      console.log("chamando o banco de dados");
      const ret = await user.save(error => {
        if (error) {
          msgError = `Erro ao salvar o usuario ${usuario.usuario} - 
          ${error}`;
          return;
        }
      });

      if (msgError) {
        throw new Error(msgError);
      }

      console.log(`retorno `, ret);
      return `Usuario ${usuario.usuario} criado com sucesso - ${ret}`;
    } catch (err) {
      console.error(err);
      console.log(err.message);
      LOG.info(err.message);
      throw new Error(err.message);
    }
  }

  /**
   * recupera um usuario da base de dados
   * @param {String} usuario
   * @returns {Usuario}
   */
  async find(usuario, password) {
    try {
      console.log(`######### Buscando o usuario ${usuario} ############`);
      const encontrado = await Usuario.findOne({ usuario });
      if (!encontrado) {
        return null;
      }

      if (bcrypt.compareSync(password, encontrado.password)) {
        console.log(encontrado);
        return encontrado;
      } else {
        return null;
      }
    } catch (err) {
      LOG.info(err.message);
      console.error(err);
      throw new Error(err.message);
    }
  }
}

module.exports = new UsuarioService();
