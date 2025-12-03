const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cuateappdb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL!');
});

app.get('/', (req, res) => {
  res.send('¡Hola Mundo, conectado a la base de datos!');
});

app.get('/api/productos', (req, res) => {
  const query = `
    SELECT
      p.id_producto AS id,
      p.nombre AS name,
      p.descripcion AS description,
      p.precio AS price,
      p.imagen_url AS image,
      c.nombre AS category
    FROM productos AS p
    JOIN categorias AS c ON p.id_categoria = c.id_categoria
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT
      p.id_producto AS id,
      p.nombre AS name,
      p.descripcion AS description,
      p.precio AS price,
      p.imagen_url AS image,
      c.nombre AS category
    FROM productos AS p
    JOIN categorias AS c ON p.id_categoria = c.id_categoria
    WHERE p.id_producto = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.json(results[0]);
    }
  });
});

// Rutas
app.use('/api', usuarioRoutes);

// Ruta de prueba
app.post('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
