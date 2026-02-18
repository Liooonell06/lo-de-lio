const Categoria = require('../models/Categoria');

const categoriaController = {
  getAll: (req, res) => {
    Categoria.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    Categoria.getById(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Categoría no encontrada' });
      } else {
        res.json(results[0]);
      }
    });
  },

  create: (req, res) => {
    const categoriaData = req.body;
    Categoria.create(categoriaData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ 
          success: true, 
          id_categoria: results.insertId,
          message: 'Categoría creada exitosamente' 
        });
      }
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const categoriaData = req.body;
    Categoria.update(id, categoriaData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Categoría no encontrada' });
      } else {
        res.json({ 
          success: true, 
          message: 'Categoría actualizada exitosamente' 
        });
      }
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    Categoria.delete(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Categoría no encontrada' });
      } else {
        res.json({ 
          success: true, 
          message: 'Categoría eliminada exitosamente' 
        });
      }
    });
  }
};

module.exports = categoriaController;
