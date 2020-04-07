const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacoes')

router.post('/', movimentacaoController.criarMovimentacao)
router.get('/', movimentacaoController.obterMovimentacoes)

module.exports = router;
