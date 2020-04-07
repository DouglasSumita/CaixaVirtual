// CRIACAO DO SCRIPT DE GERENCIAMENTO DO SERVIÇO.

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// OBJETOS DOS SCRIPTS DE ROTAS
const rotaCategoria = require('./routes/categorias');
const rotaMovimentacao = require('./routes/movimentacoes');

//MORGAN
app.use(morgan('dev'));

//BODY-PARSER
app.use(bodyParser.urlencoded({
   extended: false
})); // APENAS DADOS SIMPLES - Quando extended : true vai utilizar a biblioteca qs e quando for false ele vai utilizar a biblioteca querystring.

app.use(bodyParser.json()); // BODY FORMATO JSON;

// ROTAS
app.use('/categorias', rotaCategoria);
app.use('/movimentacoes', rotaMovimentacao);

// ROTA NAO ENCONTRADA
app.use((req, res, next) => {
   const erro = new Error('Rota não encontrada!');
   erro.status = 404;
   next(erro);
});

// ERROR
app.use((error, req, res, next) => {
   res.status(error.status || 500)
   return res.send({
      erro: {
         mensagem : error.message
      }
   });
});

module.exports = app;
