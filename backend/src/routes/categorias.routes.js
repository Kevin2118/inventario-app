const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');

router.get('/', categoriasController.listar);
router.post('/', categoriasController.crear);
router.put('/:id', categoriasController.actualizar);
router.delete('/:id', categoriasController.eliminar);

module.exports = router;