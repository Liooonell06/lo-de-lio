const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
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

app.get('/', (req, res) => {
  res.send('¡Hola Mundo, conectado a la base de datos!');
});

app.get('/api/categorias', (req, res) => {
  const query = 'SELECT id_categoria AS id, nombre AS name, descripcion AS description FROM categorias';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
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

// Rutas para pedidos
app.get('/api/pedidos', (req, res) => {
  const query = 'SELECT * FROM pedidos';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/pedidos', (req, res) => {
  const { id_mesa, total, estado } = req.body;
  const query = 'INSERT INTO pedidos (id_mesa, total, estado) VALUES (?, ?, ?)';
  db.query(query, [id_mesa, total, estado || 'Pendiente'], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id_pedido: result.insertId, message: 'Pedido creado' });
    }
  });
});

app.get('/api/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM pedidos WHERE id_pedido = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send('Pedido no encontrado');
    } else {
      res.json(results[0]);
    }
  });
});

// Rutas para pedido_detalle
app.get('/api/pedido_detalle/:id_pedido', (req, res) => {
  const { id_pedido } = req.params;
  const query = `
    SELECT pd.*, p.nombre AS producto_nombre, p.precio AS producto_precio
    FROM pedido_detalle pd
    JOIN productos p ON pd.id_producto = p.id_producto
    WHERE pd.id_pedido = ?
  `;
  db.query(query, [id_pedido], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/pedido_detalle', (req, res) => {
  const { id_pedido, id_producto, cantidad, subtotal } = req.body;
  const query = 'INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)';
  db.query(query, [id_pedido, id_producto, cantidad, subtotal], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Update total in pedidos
      const updateQuery = 'UPDATE pedidos SET total = (SELECT SUM(subtotal) FROM pedido_detalle WHERE id_pedido = ?) WHERE id_pedido = ?';
      db.query(updateQuery, [id_pedido, id_pedido], (err2) => {
        if (err2) {
          console.error('Error updating total:', err2);
        }
      });
      res.json({ id_detalle: result.insertId, message: 'Detalle agregado' });
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