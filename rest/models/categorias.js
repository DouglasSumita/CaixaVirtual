const { pool } = require('../libs/mysql');

function criarCategoria(name, callback) {

    return pool.query('INSERT INTO categorias (name) VALUES (?)',
        [name],
        function(error, response){
        if(error){
            return callback(error)
        }
        return callback(null, response)
    })
}

function obterCategorias(callback) {
   
    return pool.query('SELECT * FROM categorias',
    function(error, response, fields){
        if(error){
            return callback(error)
        }
        return callback(null, response)
    })
}

module.exports = {
    criarCategoria,
    obterCategorias
}
