const Usuario = require('../models/Usuario');

const usuarioController = {
  login: (req, res) => {
    const { dni, password } = req.body;
    Usuario.login(dni, password, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'DNI o contraseña incorrectos' });
      } else {
        res.json({ success: true, user: results[0] });
      }
    });
  },

  register: (req, res) => {
    const userData = req.body;
    Usuario.register(userData, (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ error: 'El DNI ya está registrado' });
        } else {
          res.status(500).json({ error: err.message });
        }
      } else {
        res.json({ success: true, message: 'Usuario registrado exitosamente' });
      }
    });
  },

  getAll: (req, res) => {
    Usuario.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  handleAction: (req, res) => {
    const { action } = req.body;
    if (action === 'login') {
      usuarioController.login(req, res);
    } else if (action === 'register') {
      usuarioController.register(req, res);
    } else {
      res.status(400).json({ error: 'Acción no válida' });
    }
  }
};

module.exports = usuarioController;