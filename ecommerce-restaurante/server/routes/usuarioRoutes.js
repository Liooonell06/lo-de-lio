const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/usuarios', usuarioController.getAll);
router.post('/usuarios', usuarioController.handleAction);

module.exports = router;