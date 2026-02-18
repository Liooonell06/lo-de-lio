const Pedido = require('../models/Pedido');
const Mesa = require('../models/Mesa');

const pedidoController = {
  getAll: (req, res) => {
    Pedido.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    Pedido.getById(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Pedido no encontrado' });
      } else {
        res.json(results[0]);
      }
    });
  },

  getByMesa: (req, res) => {
    const { id_mesa } = req.params;
    Pedido.getByMesa(id_mesa, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  getByStatus: (req, res) => {
    const { estado } = req.params;
    Pedido.getByStatus(estado, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  create: (req, res) => {
    const pedidoData = req.body;
    Pedido.create(pedidoData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Update mesa status to 'Ocupada'
        if (pedidoData.id_mesa) {
          Mesa.updateStatus(pedidoData.id_mesa, 'Ocupada', (err2) => {
            if (err2) console.error('Error updating mesa status:', err2);
          });
        }
        res.status(201).json({ 
          success: true, 
          id_pedido: results.insertId,
          message: 'Pedido creado exitosamente' 
        });
      }
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const pedidoData = req.body;
    Pedido.update(id, pedidoData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Pedido no encontrado' });
      } else {
        res.json({ 
          success: true, 
          message: 'Pedido actualizado exitosamente' 
        });
      }
    });
  },

  updateStatus: (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    Pedido.updateStatus(id, estado, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Pedido no encontrado' });
      } else {
        // If pedido is completed or canceled, free the mesa
        if (estado === 'Completado' || estado === 'Cancelado') {
          Pedido.getById(id, (err2, results2) => {
            if (!err2 && results2.length > 0 && results2[0].id_mesa) {
              Mesa.updateStatus(results2[0].id_mesa, 'Disponible', (err3) => {
                if (err3) console.error('Error freeing mesa:', err3);
              });
            }
          });
        }
        res.json({ 
          success: true, 
          message: 'Estado del pedido actualizado exitosamente' 
        });
      }
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    Pedido.delete(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Pedido no encontrado' });
      } else {
        res.json({ 
          success: true, 
          message: 'Pedido eliminado exitosamente' 
        });
      }
    });
  }
};

module.exports = pedidoController;
