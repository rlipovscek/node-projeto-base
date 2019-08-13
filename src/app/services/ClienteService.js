const Cliente = require("../models/Cliente");
const LOG = require("./LogService");

class ClienteService {
  /**
   * Recupera todos os usuarios da base de dados
   */
  async getAll() {
    try {
      LOG.info("Buscando todos os usuarios");
      // const usuarios = [];
      let msgError;
      const usuarios = await Cliente.find({}, (err, users) => {
        if (err) {
          msgError = err.message;
          return;
        }
      });

      if (msgError) {
        throw new Error(msgError);
      }
      LOG.info("retornado " + JSON.stringify(usuarios));
      return usuarios;
    } catch (err) {
      Log.info(err.message);
      console.error(err.message);
      throw new Error(err.msg);
    }
  }

  /**
   * @param {string} cnpj
   * @returns {Cliente}
   */
  async getByCnpj(cnpj) {
    try {
      LOG.info("Buscando cliente de documento " + cnpj);
      const usuario = await Cliente.findOne({ cnpj });
      LOG.info("retornado " + JSON.stringify(usuario));
      return usuario;
    } catch (err) {
      console.error(err);
      LOG.info(err.message);
    }
  }

  /**
   * Salva um cliente na base da dados
   *
   * @param {Cliente} client
   */
  async saveClient(client) {
    const cliente = new Cliente(client);
    try {
      console.log("########## Salvando o usuario ##########");
      console.log(client);
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

      LOG.info("cliente ${client.razaoSocial} salvo com sucesso!");
      return ret;
    } catch (err) {
      console.info("Erro ao salvar o cliente na base de dados!");
      console.info(err.message);
      console.error(err);
      throw new Error(err.message);
    }
  }
}

module.exports = new ClienteService();
