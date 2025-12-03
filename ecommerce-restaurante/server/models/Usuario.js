const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cuateappdb'
});

class Usuario {
  static login(dni, password, callback) {
    const query = 'SELECT * FROM usuarios WHERE dni = ? AND password = ?';
    db.query(query, [dni, password], callback);
  }

  static register(userData, callback) {
    const { nombre, apellido, password, dni, rol } = userData;
    const query = 'INSERT INTO usuarios (nombre, apellido, password, dni, rol) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, apellido, password, dni, rol], callback);
  }

  static getAll(callback) {
    const query = 'SELECT * FROM usuarios';
    db.query(query, callback);
  }
}

module.exports = Usuario;