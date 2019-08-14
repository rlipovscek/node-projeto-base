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
        required: true
    },
    dataNascimento: {
        type: String,
        required: true
    },
    fotoCliente: {
        type: String,
        required: true
    },
    fotoAssinatura: {
        type: String,
        required: true
    },
    listaDocumento: {
        documento: [
          {
            numeroDocumento: {
                type: String,
                required: true
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
        required: true
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
        type: Number,
        required: true
    },
    rendaPresumida: {
        type: Number,
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
              type: Number,
              required: true
            },
            status: {
              type: Number,
              required: true
            },
            saldo: {
                type: Number,
                required: true
            },
            dataAbertura: {
                type: Date,
                required: true,
                default: new Date()
            },
            dataEncerramento: {
                type: Date
            }
          }
        ]
      },
      listaEndereco: {
        endereco: [
          {
            logradouro: {
              type: String,
              required: true
            },
            numero: {
              type: String,
              required: true
            },
            complemento: {
              type: String
            },
            bairro: {
              type: String,
              required: true
            },
            cidade: {
                type: String,
                required: true
            },
            estado: {
                type: String,
                required: true
            },
            cep: {
                type: String,
                required: true
            },
            pais: {
                type: String,
                required: true
            },
            correspondencia: {
                type: Boolean,
                required: true
            }
          }
        ]
      },
      listaTelefone: {
        telefone: [
          {
            codigoPais: {
              type: Number,
              required: true
            },
            codigoDDD: {
              type: Number,
              required: true
            },
            numeroTelefone: {
              type: Number,
              required: true
            },
            tipoTelefone: {
              type: String,
              required: true
            }
          }
        ]
      },
      listaAnexo: {
        anexo: [
          {
            descricao: {
              type: String
            },
            identificacaoAnexo: {
              type: String
            }
          }
        ]
      }
    });

module.exports = mongoose.model('ClientePF', ClientePF);

