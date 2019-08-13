const _mongoose = require("mongoose");
const Schema = _mongoose.Schema;z

const ClienteSchema = new Schema({
  cnpj: {
    type: String,
    required: true,
    unique: true
  },
  razaoSocial: {
    type: String,
    required: true
  },
  atividade: {
    type: String,
    required: true
  },
  dataDeAbertura: {
    type: Date,
    default: new Date(),
    required: true
  },
  faturamento: {
    type: Number
  },
  contas: [
    {
      numero: {
        type: String,
        required: true,
        unique: true
      },
      saldo: {
        type: Number,
        required: true
      }
    }
  ],
  enderecos: [
    {
      tipo: String,
      logradouro: String,
      complemento: String,
      bairro: String,
      cidade: String,
      estado: String,
      cep: String,
      pais: String
    }
  ],
  telefones: [
    {
      codigoPais: String,
      codigoDDD: String,
      numero: String
    }
  ],
  beneficiarios: [
    {
      nome: {
        type: String,
        required: true
      },
      cpfCnpj: {
        type: String,
        required: true,
        unique: true
      },
      pep: String
    }
  ],
  anexos: [
    {
      descricao: String,
      idAnexo: {
        type: String,
        unique: true
      }
    }
  ]
});

module.exports = _mongoose.model("Cliente", ClienteSchema);
