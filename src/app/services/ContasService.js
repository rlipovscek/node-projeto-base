const Conta = require("../models/Conta");
const LOG = require("./LogService");
const ClienteService = require("./ClienteService");
const CONFIG = require("../../config/config");

class ContaService {
  /**
   * Salva uma conta na base
   *
   * @param {Conta} conta
   */
  async save(conta) {
    console.log("####### salvando a conta #######");
    try {
      console.log("Conta: ", conta);
      console.log("---------------------------------");

      if (!conta.codigoIdentificacaoFintech) {
        conta.codigoIdentificacaoFintech = CONFIG.codigoIdentificacaoFintech;
      }

      if (!conta.codigoTipoMovimento) {
        throw new Error("É obrigatorio informar o tipo do movimento");
      }

      if (conta.codigoTipoMovimento !== 1) {
        if (conta.codigoTipoMovimento !== 2) {
          throw new Error(
            "O codigoTipoMovimento deve ser 1 - Inclusao ou 2 - alteracao "
          );
        }
      }

      if (!conta.numeroConta || conta.numeroConta === "") {
        throw new Error("numeroConta Invalido!");
      }

      if (!conta.listaUsuario || !conta.listaUsuario.usuario) {
        throw new error("informe pelo menos um usuario para a conta!");
      }

      const cliente = await ClienteService.getByCnpj(conta.c);

      const contaNaBase = await this.getConta(conta.numeroConta);

      if (contaNaBase) {
        throw new Error(
          `Conta de numero ${conta.numeroConta} ja existe ` +
            JSON.stringify(contaNaBase)
        );
      }

      const c = new Conta(conta);
      let msgError;
      const ret = await c.save(error => {
        if (error) {
          msgError = error;
          return;
        }
      });

      if (msgError) {
        throw new Error(msgError);
      }
      await LOG.info("Conta salva com sucesso" + JSON.stringify(conta));
      return ret;
    } catch (err) {
      await LOG.info(err.message + JSON.stringify(conta));
      throw new Error(err.message);
    }
  }

  async getConta(numeroConta) {
    try {
      console.log(
        "############## Buscando a conta " + numeroConta + "##############"
      );
      let msgError;
      const conta = await Conta.findOne({ numeroConta }, error => {
        if (error) {
          msgError = error;
          return;
        }
      });

      if (msgError) {
        throw new Error(msgError);
      }
      console.log("conta encontrada: " + JSON.stringify(conta));
      return conta;
    } catch (error) {
      console.error(error);
      LOG.info(error.message);
      throw new Error(error.message);
    }
  }

  async bloquearConta(conta) {
    try {
      console.log("########### bloqueio de conta ############");
      console.log(conta);
      const { numeroConta } = conta;
      let msgErro;
      const encontrada = await this.getConta(numeroConta);
      if (!encontrada) {
        throw new Error(`Conta ${numeroConta} nao existe`);
      }
      await Conta.update({ numeroConta }, conta, err => {
        if (err) {
          msgErro = err;
          return;
        }
      });

      if (msgErro) {
        throw new Error(msgErro);
      }

      return;
    } catch (error) {
      console.error(error);
      LOG.info(error.message);
      throw new Error(error.message);
    }
  }

  async encerrarConta(conta) {
    try {
      console.log("########### encerramento de conta ############");
      console.log(conta);
      const { numeroConta } = conta;
      let msgErro;
      const encontrada = await this.getConta(numeroConta);
      if (!encontrada) {
        throw new Error(`Conta ${numeroConta} nao existe`);
      }
      await Conta.update({ numeroConta }, conta, err => {
        if (err) {
          msgErro = err;
          return;
        }
      });

      if (msgErro) {
        throw new Error(msgErro);
      }

      return;
    } catch (error) {
      console.error(error);
      LOG.info(error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = new ContaService();
