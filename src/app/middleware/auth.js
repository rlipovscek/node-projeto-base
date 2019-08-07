const express = require('express');
const _path = require("path");
const jtoken = require(_path.resolve(__dirname, '../../config/jtoken'));
const TOKEN = 'dGVzdGU6MTIz';

/**
 * intercepta as requisições dos usuarios e verifica se o mesmo possui
 * autenticação
 * 
 * @param {express.Request} req
 * @param {express.Response} resp
 * @param { express.Next } next
 */
function auth(req, resp, next){
   let auth = 'Authorization';
    console.log('Headers do usuario: ');
    console.log(req.headers);

    if(req.headers[auth] === undefined){
           auth = auth.toLowerCase();
    }
    if(req.headers[auth] === 'Basic '+ TOKEN ) {
           console.log("[Basic "+ TOKEN+"]");
           next();
    }

    if(req.headers[auth] === jtoken.token_type+" "+jtoken.access_token){
           console.log(" ["+jtoken.token_type+" "+jtoken.access_token);
           next();
       
    }
    const keyToken = jtoken.token_type+" "+jtoken.access_token;
    try {
           console.log(' KeyToken '+keyToken);
           console.log(' Header '+req.headers[auth].substring(0,31));
           if(req.headers[auth].substring(0,31) === keyToken.substring(0,31)){
                  console.log(" Validando periodo!");
                  const strData = req.headers[auth].substring(31,41);
                  console.log("Cabec "+req.headers[auth]);
                  console.log("Cabec "+req.headers[auth].substring(0,31));
                  const now = new Date();
                  const ano = "20"+strData.substring(0,2);
                  const mes = strData.substring(2,4);
                  const dia = strData.substring(4,6);
                  const hora = strData.substring(6,8);
                  const minuto = strData.substring(8,10);
                  console.log(" StrData "+ano+"-"+mes+"-"+
                                dia+" "+
                                hora+":"+
                                minuto+" "); 

                  let dt = new Date(ano+"-"+mes+"-"+dia+" "+hora+":"+minuto+":00");
                  console.log(dateFormat(dt, "dd/mm/yyyy HH:MM"));       
                  dt.setSeconds(dt.getSeconds()+3600);     
                  console.log(dateFormat(dt, "dd/mm/yyyy HH:MM"));       
                  if(now<=dt){
                      next()
                  }else{
                    resp.status(401).send('Usuario sem acesso');
                  }
           
           }
    }catch(e){
           console.log(e);
           resp.status(401).send('Usuario sem acesso');
    }

}

module.exports = auth;