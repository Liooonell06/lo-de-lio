const express = require('express');
const mesaController = require('../controllers/mesaController');
const router = express.Router();

router.get('/mesas', mesaController.getAll);
router.get('/mesas/disponibles', mesaController.getAvailable);
router.get('/mesas/:id', mesaController.getById);
router.post('/mesas', mesaController.create);
router.put('/mesas/:id', mesaController.update);
router.patch('/mesas/:id/estado', mesaController.updateStatus);
router.delete('/mesas/:id', mesaController.delete);

module.exports = router;
