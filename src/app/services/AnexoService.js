const Anexo = require("../models/Anexo");
const LOG = require("./LogService");
const CLIENTE_SERVICE = require("./ClienteService");
const ClientePFService = require('./ClientePFService');

class AnexoService {
  /**
   * Salva um anexo na base de dados
   *
   * @param {Anexo} anexo
   */
  async save(anexo) {
    try {
      const encontrado = await this.getById(anexo.id);
      console.log(encontrado);
      if (!anexo.documento) {
        throw new Error(`Documento no formato invalido`);
      }

      if (!anexo.id) {
        throw new Error(`iformar o id do anexo`);
      }

      if (!anexo.arquivo) {
        throw new Error(`arquivo nao informado`);
      }

      if (encontrado) {
        throw new Error(`Ja existe um anexo com id ${anexo.id}`);
      }

      const cliente = await CLIENTE_SERVICE.getByCnpj(anexo.documento);
      if (!cliente) {
        throw new Error(
          ` - nao exitem clientes registrados para o documento ${
            anexo.documento
          }!`
        );
      }
      console.log("########## Salvando anexo ##########");
      console.log(anexo);
      const anx = new Anexo(anexo);

      let msgError;
      const ret = await anx.save(err => {
        if (err) {
          msgError = err;
          return;
        }
      });

      if (msgError) {
        throw new Error(`Erro ao salvar o anexo - ${msgError}`);
      }
      console.log("anexo salvo!");
      return `Anexo salvo com sucesso - ${ret}`;
    } catch (err) {
      console.error(err);
      LOG.info(err.message);
      throw new Error(err.message);
    }
  }

  async getById(id, documento) {
    try {
      console.log(
        `procurando o arquivo de id ${id} para o documento ${documento}`
      );
      let ret;
      if (documento) {
        ret = await Anexo.findOne({ id, documento });
      } else {
        ret = await Anexo.findOne({ id });
      }
      return ret;
    } catch (err) {
      console.log(err);
      LOG.info(err.message);
      throw new Error(err.message);
    }
  }

  async getByDocumento(documento) {
    try {
      console.log(`procurando o arquivos para o documento ${documento}`);
      const ret = await Anexo.find({ documento });
      return ret;
    } catch (err) {
      console.log(err);
      LOG.info(err.message);
      throw new Error(err.message);
    }
  }
}

module.exports = new AnexoService();
