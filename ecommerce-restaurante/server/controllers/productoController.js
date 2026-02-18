const Producto = require('../models/Producto');

const productoController = {
  getAll: (req, res) => {
    Producto.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    Producto.getById(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json(results[0]);
      }
    });
  },

  getByCategory: (req, res) => {
    const { id_categoria } = req.params;
    Producto.getByCategory(id_categoria, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  create: (req, res) => {
    const productoData = req.body;
    Producto.create(productoData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ 
          success: true, 
          id_producto: results.insertId,
          message: 'Producto creado exitosamente' 
        });
      }
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const productoData = req.body;
    Producto.update(id, productoData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json({ 
          success: true, 
          message: 'Producto actualizado exitosamente' 
        });
      }
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    Producto.delete(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json({ 
          success: true, 
          message: 'Producto eliminado exitosamente' 
        });
      }
    });
  }
};

module.exports = productoController;
