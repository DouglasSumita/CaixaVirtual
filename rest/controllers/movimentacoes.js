
const movimentacaoModel = require('../models/movimentacoes')

function criarMovimentacao(req,res){
    const {body} = req

    movimentacaoModel.criarMovimentacao(body.descricao, body.id_categoria, body.valor, body.tipo, body.data, body.usuario, function(error, response){
        if(error){
            return res.status(501).send({mensagem:"Falha ao inserir a movimentação"})
        }
        res.status(201).send({mensagem: "Cadastrado com sucesso"})
    })
}

function obterMovimentacoes(req, res){
    
    const usuario = req.headers.authorization;

    movimentacaoModel.obterMovimentacoes(usuario, function(error, response){
        if(error) {
            return res.status(501).send({mensagem:"Falha ao listar as movimentações"})
        }  
        res.status(200).send(response)
    })
}

module.exports = {
    criarMovimentacao,
    obterMovimentacoes
}