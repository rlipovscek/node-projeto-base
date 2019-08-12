# Heroku

1. Conta
   Crie uma conta no site https://heroku.com
2. Instalacao
   baixe o cliente https://devcenter.heroku.com/articles/heroku-cli e efetue a instalacao
3. Abra o terminal e efetue o comando `heroku login` e faça o login na plataforma

#Editando e publicando

1. Abra o arquivo /config/config.js e copie o nome da origem do projeto
2. Abra o terminal e efetue o comando `heroku git:remote -a {origem}`
   Ex: `heroku git:remote -a calm-falls-12674`
3. efetue o pull do projeto na origem do heroku com o comando: `git pull heroku master`
4. efetue o commit e o push na origem do heroku com o comando: `git push heroku master`

# Edição

- Para editar as rotas do projeto utilize o arquivo /config/Routes.enum.js
- para alterar o nome do projeto edite o campo origem do arquivo /config/config.js
