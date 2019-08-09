const LogModel = require("../models/Logs");
const _path = require("path");
const origem = require('../../config/config').origem;

class LogService{
    /**
     * @param {LogModel} log
     */
    async info(log){
        const logInfo = { log, origem };
        try{
            // onsole.log("Salvando log na base de dados");
            console.log(' ====> ' + JSON.stringify(logInfo));
            const m = new LogModel(logInfo);
            let errMsg;
            await m.save((err)=>{
                if(err){
                    errMsg = err;
                    return;
                }
            });

            if(errMsg){
                throw new Error(errMsg);
            }

        }catch(exp){
            console.log("###### Erro ao salvar log ######")
            console.error(exp);
        }
    }
}

module.exports = new LogService();