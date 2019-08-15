module.exports = {
  CONTEXTO: "/",
  CLIENTES: {
    ALL: "/usuarios",
    SAVE: "/usuarios/salvar",
    GET_BY_CNPJ: "/usuarios/pj/:cnpj"
  },
  CLIENTES_PF: {
    ALL: "/usuarios",
    SAVE: "/usuarios/pf/salvar",
    GET_BY_CPF: "/usuarios/pf/:cpf"
  },
  CONTAS: {
    INCLUIR: "/incluirConta",
    BLOQUEIO_DESBLOQUEIO: "/bloquearDesbloquearConta",
    ENCERRAR: "/encerrarConta"
  },
  USUARIOS: {
    SAVE: "/usuarios/incluir"
  },
  ANEXOS: {
    SAVE: "/usuarios/pj/:documento/anexos/salvar",
    GET: "/usuarios/pj/:documento/anexos/:id",
    GET_ALL: "/usuarios/pj/:documento/anexos"
  }
};
