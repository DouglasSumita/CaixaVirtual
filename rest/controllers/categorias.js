
const categoriaModel = require('../models/categorias')

function criarCategoria(req,res){
    const {body} = req
    categoriaModel.criarCategoria(body.name, function(error, response){
        if(error){
            return res.status(501).send({mensagem:"Falha ao cadastrar a categoria"})
        }
        res.status(201).send({mensagem: "Cadastrado com sucesso"})
    })
}

function obterCategorias(req, res){
    categoriaModel.obterCategorias(function(error, response){
      if(error) {
          return res.status(501).send({mensagem:"Falha ao listar as categorias"})
      }  
      res.status(200).send({categorias: response})
    })
}

module.exports = {
    criarCategoria,
    obterCategorias
}