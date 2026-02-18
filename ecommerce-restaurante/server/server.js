const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Routes
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pedidoDetalleRoutes = require('./routes/pedidoDetalleRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lodeliodb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL!');
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola Mundo, conectado a la base de datos!');
});

// Rutas - todas bajo /api
app.use('/api', usuarioRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', productoRoutes);
app.use('/api', mesaRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', pedidoDetalleRoutes);

// Ruta de prueba
app.post('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
