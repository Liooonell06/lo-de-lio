const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();

router.get('/categorias', categoriaController.getAll);
router.get('/categorias/:id', categoriaController.getById);
router.post('/categorias', categoriaController.create);
router.put('/categorias/:id', categoriaController.update);
router.delete('/categorias/:id', categoriaController.delete);

module.exports = router;
