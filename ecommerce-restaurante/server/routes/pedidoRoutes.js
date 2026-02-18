const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const router = express.Router();

router.get('/pedidos', pedidoController.getAll);
router.get('/pedidos/mesa/:id_mesa', pedidoController.getByMesa);
router.get('/pedidos/estado/:estado', pedidoController.getByStatus);
router.get('/pedidos/:id', pedidoController.getById);
router.post('/pedidos', pedidoController.create);
router.put('/pedidos/:id', pedidoController.update);
router.patch('/pedidos/:id/estado', pedidoController.updateStatus);
router.delete('/pedidos/:id', pedidoController.delete);

module.exports = router;
