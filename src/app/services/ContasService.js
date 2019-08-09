const Conta = require('../models/Conta');
const LOG = require('./LogService');

class ContaService {
    /**
     * Salva uma conta na base
     * 
     * @param {Conta} conta 
     */
    async save(conta) {
        console.log('####### salvando a conta #######');
        try {
            console.log("Conta: ", conta);
            console.log('---------------------------------');

            if (!conta.codigoTipoMovimento) {
                throw new Error('É obrigatorio informar o tipo do movimento');
            }

            if (conta.codigoTipoMovimento !== 1) {
                if (conta.codigoTipoMovimento !== 2) {
                    throw new Error('O codigoTipoMovimento deve ser 1 - Inclusao ou 2 - alteracao ');
                }
            }

            if (!conta.numeroConta || conta.numeroConta === '') {
                throw new Error('numeroConta Invalido!');
            }

            const contaNaBase = await this.getConta(conta.numeroConta);
            
            if(contaNaBase){
                throw new Error(`Conta de numero ${conta.numeroConta} ja existe ` + JSON.stringify(contaNaBase));
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
            await LOG.info('Conta salva com sucesso' + JSON.stringify(conta));
            return ret;

        } catch (err) {
            await LOG.info(err.message + JSON.stringify(conta));
            throw new Error(err.message);
        }

    }

    async getConta(numeroConta){
        try{
            console.log("############## Buscando a conta " + numeroConta + "##############");
            let msgError;
            const conta = await Conta.findOne({numeroConta}, error =>{
                if(error){
                    msgError = error;
                    return;
                }
            });

            if(msgError){
                throw new Error(msgError);
            }
            console.log("conta encontrada: " + JSON.stringify(conta));
            return conta;

        }catch(error){
            console.error(error);
            LOG.info(error.message);
            throw new Error(error.message);
        }
    }
}

module.exports = new ContaService();