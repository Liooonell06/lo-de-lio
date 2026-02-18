const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lodeliodb'
});

class Mesa {
  static getAll(callback) {
    const query = 'SELECT * FROM mesas ORDER BY id_mesa';
    db.query(query, callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM mesas WHERE id_mesa = ?';
    db.query(query, [id], callback);
  }

  static getAvailable(callback) {
    const query = "SELECT * FROM mesas WHERE estado = 'Disponible'";
    db.query(query, callback);
  }

  static create(mesaData, callback) {
    const { num_personas, estado } = mesaData;
    const query = 'INSERT INTO mesas (num_personas, estado) VALUES (?, ?)';
    db.query(query, [num_personas, estado || 'Disponible'], callback);
  }

  static update(id, mesaData, callback) {
    const { num_personas, estado } = mesaData;
    const query = 'UPDATE mesas SET num_personas = ?, estado = ? WHERE id_mesa = ?';
    db.query(query, [num_personas, estado, id], callback);
  }

  static updateStatus(id, estado, callback) {
    const query = 'UPDATE mesas SET estado = ? WHERE id_mesa = ?';
    db.query(query, [estado, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM mesas WHERE id_mesa = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Mesa;
