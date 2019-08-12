const express = require("express");
const _path = require("path");
const jtoken = require(_path.resolve(__dirname, "../../config/jtoken"));
const TOKEN = "dGVzdGU6MTIz";
const UsuarioService = require("../services/UsuarioService");

/**
 * intercepta as requisições dos usuarios e verifica se o mesmo possui
 * autenticação
 *
 * @param {express.Request} req
 * @param {express.Response} resp
 * @param { express.Next } next
 */
async function auth(req, resp, next) {
  console.log("Headers do usuario: ");
  console.log(req.headers);

  try {
    const { authorization } = req.headers;
    if (!authorization) {
      console.log("requisicao sem authorization");
      return resp.status(401).send("Usuario sem acesso");
    }
    const basicToken = authorization.split(" ")[1];
    console.log("token", basicToken);
    const valorFormatado = Buffer.from(basicToken, "base64").toString("ascii");
    const usuario = valorFormatado.split(":")[0];
    const senha = valorFormatado.split(":")[1];
    const encontrado = await UsuarioService.find(usuario, senha);
    if (encontrado) {
      next();
    } else {
      resp.status(401).send("Usuario sem acesso");
    }
  } catch (e) {
    console.log(e);
    resp.status(401).send("Usuario sem acesso");
  }
}

module.exports = auth;
