const PedidoDetalle = require('../models/PedidoDetalle');

const pedidoDetalleController = {
  getByPedido: (req, res) => {
    const { id_pedido } = req.params;
    PedidoDetalle.getByPedido(id_pedido, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  create: (req, res) => {
    const detalleData = req.body;
    PedidoDetalle.create(detalleData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ 
          success: true, 
          id_detalle: results.insertId,
          message: 'Detalle de pedido creado exitosamente' 
        });
      }
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const detalleData = req.body;
    PedidoDetalle.update(id, detalleData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      } else {
        res.json({ 
          success: true, 
          message: 'Detalle de pedido actualizado exitosamente' 
        });
      }
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    PedidoDetalle.delete(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      } else {
        res.json({ 
          success: true, 
          message: 'Detalle de pedido eliminado exitosamente' 
        });
      }
    });
  }
};

module.exports = pedidoDetalleController;
