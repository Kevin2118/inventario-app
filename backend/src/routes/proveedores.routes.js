const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller');

router.get('/', proveedoresController.listar);
router.post('/', proveedoresController.crear);
router.put('/:id', proveedoresController.actualizar);
router.delete('/:id', proveedoresController.eliminar);

module.exports = router;