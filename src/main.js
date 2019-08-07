const server = require("./server");

const porta = process.env.PORT || 3000;
server.listen(porta, () => {
  console.log(`ouvindo`, porta);
});
