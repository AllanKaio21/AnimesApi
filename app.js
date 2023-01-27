const express = require("express");
const select = require("./selects/select.js");

const app = express(); 
const port = 3000;
// Rota padrão da api
app.get('/', async (req, res) => {
  res.send("Api de pesquisa de animes!");
});
// Rota de pesquisa de animes Ex.: /select?name=One Piece
app.get('/select', async (req, res) => {
  res.send(await select.selectAnimes(req));
});
// Porta
app.listen(port);
console.log(`Api iniciada na porta ${port}.`);