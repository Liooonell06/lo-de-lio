const express = require('express');
const pedidoDetalleController = require('../controllers/pedidoDetalleController');
const router = express.Router();

router.get('/pedido_detalle/:id_pedido', pedidoDetalleController.getByPedido);
router.post('/pedido_detalle', pedidoDetalleController.create);
router.put('/pedido_detalle/:id', pedidoDetalleController.update);
router.delete('/pedido_detalle/:id', pedidoDetalleController.delete);

module.exports = router;
