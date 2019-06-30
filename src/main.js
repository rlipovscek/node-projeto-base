const server = require("./server");

const porta = 3000 || process.env.PORT;
server.listen(porta, () => {
  console.log(`ouvindo`, porta);
});
