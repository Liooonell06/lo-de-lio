const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lodeliodb'
});

class Pedido {
  static getAll(callback) {
    const query = `
      SELECT 
        p.id_pedido AS id,
        p.id_mesa,
        p.fecha,
        p.total,
        p.estado,
        m.num_personas AS mesa_personas
      FROM pedidos p
      LEFT JOIN mesas m ON p.id_mesa = m.id_mesa
      ORDER BY p.fecha DESC
    `;
    db.query(query, callback);
  }

  static getById(id, callback) {
    const query = `
      SELECT 
        p.id_pedido AS id,
        p.id_mesa,
        p.fecha,
        p.total,
        p.estado,
        m.num_personas AS mesa_personas
      FROM pedidos p
      LEFT JOIN mesas m ON p.id_mesa = m.id_mesa
      WHERE p.id_pedido = ?
    `;
    db.query(query, [id], callback);
  }

  static getByMesa(id_mesa, callback) {
    const query = `
      SELECT * FROM pedidos 
      WHERE id_mesa = ? 
      ORDER BY fecha DESC
    `;
    db.query(query, [id_mesa], callback);
  }

  static getByStatus(estado, callback) {
    const query = `
      SELECT 
        p.id_pedido AS id,
        p.id_mesa,
        p.fecha,
        p.total,
        p.estado
      FROM pedidos p
      WHERE p.estado = ?
      ORDER BY p.fecha DESC
    `;
    db.query(query, [estado], callback);
  }

  static create(pedidoData, callback) {
    const { id_mesa, total, estado } = pedidoData;
    const query = 'INSERT INTO pedidos (id_mesa, total, estado) VALUES (?, ?, ?)';
    db.query(query, [id_mesa, total || 0, estado || 'Pendiente'], callback);
  }

  static update(id, pedidoData, callback) {
    const { id_mesa, total, estado } = pedidoData;
    const query = 'UPDATE pedidos SET id_mesa = ?, total = ?, estado = ? WHERE id_pedido = ?';
    db.query(query, [id_mesa, total, estado, id], callback);
  }

  static updateStatus(id, estado, callback) {
    const query = 'UPDATE pedidos SET estado = ? WHERE id_pedido = ?';
    db.query(query, [estado, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM pedidos WHERE id_pedido = ?';
    db.query(query, [id], callback);
  }

  static calculateTotal(id_pedido, callback) {
    const query = `
      UPDATE pedidos 
      SET total = (
        SELECT SUM(subtotal) 
        FROM pedido_detalle 
        WHERE id_pedido = ?
      ) 
      WHERE id_pedido = ?
    `;
    db.query(query, [id_pedido, id_pedido], callback);
  }
}

module.exports = Pedido;
