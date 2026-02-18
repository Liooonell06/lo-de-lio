const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lodeliodb'
});

class Categoria {
  static getAll(callback) {
    const query = 'SELECT * FROM categorias';
    db.query(query, callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM categorias WHERE id_categoria = ?';
    db.query(query, [id], callback);
  }

  static create(categoriaData, callback) {
    const { nombre, descripcion } = categoriaData;
    const query = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';
    db.query(query, [nombre, descripcion], callback);
  }

  static update(id, categoriaData, callback) {
    const { nombre, descripcion } = categoriaData;
    const query = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?';
    db.query(query, [nombre, descripcion, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM categorias WHERE id_categoria = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Categoria;
