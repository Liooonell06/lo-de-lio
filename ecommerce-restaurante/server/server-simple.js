const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cuateappdb'
});

db.connect((err) => {
  if (err) {
    console.log('Error conectando a MySQL:', err);
  } else {
    console.log('Conectado a MySQL!');
  }
});

app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/usuarios', (req, res) => {
  const { action, dni, password, nombre, apellido, rol } = req.body;
  
  if (action === 'login') {
    const query = 'SELECT * FROM usuarios WHERE dni = ? AND password = ?';
    db.query(query, [dni, password], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'DNI o contraseña incorrectos' });
      } else {
        res.json({ success: true, user: results[0] });
      }
    });
  } else if (action === 'register') {
    const query = 'INSERT INTO usuarios (nombre, apellido, password, dni, rol) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, apellido, password, dni, rol], (err, results) => {
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
  } else {
    res.status(400).json({ error: 'Acción no válida' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});