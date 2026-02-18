const express = require('express');
const productoController = require('../controllers/productoController');
const router = express.Router();

router.get('/productos', productoController.getAll);
router.get('/productos/:id', productoController.getById);
router.get('/productos/categoria/:id_categoria', productoController.getByCategory);
router.post('/productos', productoController.create);
router.put('/productos/:id', productoController.update);
router.delete('/productos/:id', productoController.delete);

module.exports = router;
