const Cliente = require("../models/Cliente");
const _mongoose = require("mongoose");
class UsuarioService {
  /**
   * Recupera todos os usuarios da base de dados
   */
  getAll() {
    return [];
  }

  /**
   * Salva um cliente na base da dados
   *
   * @param {Cliente} client
   */
  async saveClient(client) {
    const cliente = new Cliente(client);
    try {
      console.info("Abrindo comunicacao com a base de dados");
      let errMesg;
      const ret = await cliente.save(err => {
        if (err) {
          errMesg = err.message;
          return err;
        } else {
          console.info(`cliente ${client.razaoSocial} salvo com sucesso!`);
        }
      });
      if (errMesg) {
        throw new Error(errMesg);
      }

      return ret;
    } catch (err) {
      console.info("Erro ao salvar o cliente na base de dados!");
      console.error(err);
      throw new Error(err.message);
    }
  }
}

module.exports = new UsuarioService();
