const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categorias')

router.post('/', categoriaController.criarCategoria)
router.get('/', categoriaController.obterCategorias)

module.exports = router;
