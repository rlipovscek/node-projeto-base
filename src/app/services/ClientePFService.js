const ClientePF = require("../models/ClientePF");
const Log = require("./LogService");
class ClientePFService{

    /**
     * 
     * @param {ClientePF} cliente 
     */
    async salvarCliente(cliente){
        const modelClientePF = new ClientePF(cliente);
        try{
            console.log(" ################# Salvando cliente PF #################");
            console.log(JSON.stringify(cliente));
            await ClientePF.create(cliente);
        }catch(err){
            Log.info(err.message);
            throw new Error(err.message);
        }
    }

    async getByCPF(cpf){
        try{
            const cliente = ClientePF.findOne({ cpf });
            console.log("--------------- cliente encontrado ---------------");
            console.log(JSON.stringify(cliente));
            return cliente;
        } catch(err){
            Log.info(err.message);
            throw new Error(err.message);
        }
    }
}
module.exports = new ClientePFService();