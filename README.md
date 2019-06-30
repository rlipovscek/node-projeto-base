# Arquivo base para aplicacao em Nodejs com express

- Manter as Rotas do projeto no arquivo /config/Routes.enum.js
- Iniciar os middleware globais em server.initGlobalMiddleware()

# Controllers

- Todo novo controller deve estender a classe Controller
- sempre exportar uma funcao que receve o router do express e devolve a instancia do controller que esta sendo criado
- a declaracao de rotas de um controler é feita dentro do controller no metodo registerRoute exitente na classe Controller que foi estendida
