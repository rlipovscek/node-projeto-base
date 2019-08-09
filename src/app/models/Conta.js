const _mongoose = require("mongoose");
const Schema = _mongoose.Schema;

const ContaModel = new Schema({
    codigoIdentificacaoFintech:{
        type: Number
    },
    numeroAgencia:{
        type: Number
    },
    numeroConta: {
        type: Number,
        unique: true
    },
    dataInicio:{
        type: String
    },
    usuarioParceiro:{
        type: String
    }
    ,
    codigoTipoMovimento:{
        type: Number
    },
    listaUsuario: {
      usuario: [
        {
          tipoPessoa: {
              type: String
          },
          codigoTipoVinculo: {
              type: String
          },
          numeroDocumento:{
              type: String,
              unique: true
          },
          nome: {
              type: String
          }
        }    
      ]
    }
 });

module.exports = _mongoose.model('Conta', ContaModel);