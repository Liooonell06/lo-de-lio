const Mesa = require('../models/Mesa');

const mesaController = {
  getAll: (req, res) => {
    Mesa.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    Mesa.getById(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Mesa no encontrada' });
      } else {
        res.json(results[0]);
      }
    });
  },

  getAvailable: (req, res) => {
    Mesa.getAvailable((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  create: (req, res) => {
    const mesaData = req.body;
    Mesa.create(mesaData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ 
          success: true, 
          id_mesa: results.insertId,
          message: 'Mesa creada exitosamente' 
        });
      }
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const mesaData = req.body;
    Mesa.update(id, mesaData, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Mesa no encontrada' });
      } else {
        res.json({ 
          success: true, 
          message: 'Mesa actualizada exitosamente' 
        });
      }
    });
  },

  updateStatus: (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    Mesa.updateStatus(id, estado, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Mesa no encontrada' });
      } else {
        res.json({ 
          success: true, 
          message: 'Estado de mesa actualizado exitosamente' 
        });
      }
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    Mesa.delete(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Mesa no encontrada' });
      } else {
        res.json({ 
          success: true, 
          message: 'Mesa eliminada exitosamente' 
        });
      }
    });
  }
};

module.exports = mesaController;
