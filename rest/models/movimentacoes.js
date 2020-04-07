const { pool } = require('../libs/mysql');

function criarMovimentacao(descricao, id_categoria, valor, tipo, data, usuario, callback) {

    return pool.query('INSERT INTO movimentacoes (descricao, id_categoria, valor, tipo, data, usuario) VALUES (?, ?, ?, ?, ?, ?)',
        [descricao, id_categoria, valor, tipo, data, usuario],
        function(error, response){
        if(error){
            return callback(error)
        }
        return callback(null, response)
    })
}

function obterMovimentacoes(usuario, callback) {

    return pool.query(`SELECT DATE_FORMAT(movimentacoes.data, "%d/%m/%Y") as data,
                              movimentacoes.id,  
                              movimentacoes.descricao, 
                              movimentacoes.tipo,
                              movimentacoes.valor,
                              movimentacoes.id_categoria, 
                              categorias.name
                       FROM movimentacoes
                       INNER JOIN categorias ON categorias.id = movimentacoes.id_categoria 
                       WHERE usuario = ?;`,
                       [usuario],
    function(error, response, fields){
        if(error){
            return callback(error) 
        }

        return callback(null, obterSaldoMovimentacoes(response))
    })
}

function obterSaldoMovimentacoes(response) {
    
    let saldo = 0;

    for (let i = 0; i < response.length; i++) {
        if (response[i].tipo === "ENTRADA") {
            saldo += response[i].valor
        } else {
            saldo -= response[i].valor
        }    
    } 
    const resultado = {
        saldoTotal: saldo,
        movimentacoes: response.map(movimentacao => {
            return {
                data: movimentacao.data,
                id: movimentacao.id.toString(),
                categoria: {
                    id: movimentacao.id_categoria.toString(),
                    name: movimentacao.name
                },
                tipo: movimentacao.tipo,
                valor: movimentacao.valor,
                descricao: movimentacao.descricao
            }
        })
    }

    return resultado
}

module.exports = {
    criarMovimentacao,
    obterMovimentacoes
}
