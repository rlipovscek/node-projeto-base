const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientePF = new Schema({
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
        unique: true
    },
    dataNascimento: {
        type: String,
        required: true,
        unique: true
    },
    fotoCliente: {
        type: String,
        required: true,
        unique: true
    },
    fotoAssinatura: {
        type: String,
        required: true,
        unique: true
    },
    listaDocumento: {
        documento: [
          {
            numeroDocumento: {
                type: String,
                required: true,
                unique: true
              },
            tipoDocumento: {
              type: String,
              required: true
            },
            dataEmissao: {
              type: Date
            }
          }
        ]
    },
    cnpjFintech: {
        type: String,
        required: true,
        unique: true
    },
    nacionalidade: {
        type: String,
        required: true
    },
    profissao: {
        type: String,
        required: true
    },
    nomePai: {
        type: String,
        required: true
    },
    nomeMae: {
        type: String,
        required: true
    },
    usuarioPoliticamenteExposto: {
        type: Boolean,
        required: true
    },
    politicamenteExpostoDesde: {
        type: String,
        required: true
    },
    rendaMensal: {
        type: BigInt,
        required: true
    },
    rendaPresumida: {
        type: BigInt,
        required: true
    },
    clienteDesde: {
        type: String,
        required: true
    },
    listaConta: {
        conta: [
          {
            numeroConta: {
              type: String,
              required: true
            },
            numeroAgencia: {
              type: String,
              required: true
            },
            tipoConta: {
              type: Int,
              unique: true
            },
            nome: {
              type: String
            }
          }
        ]
      }
    });

module.exports = mongoose.model('ClientePf', ClientePF);

