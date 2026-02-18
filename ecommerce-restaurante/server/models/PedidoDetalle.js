const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lodeliodb'
});

class PedidoDetalle {
  static getByPedido(id_pedido, callback) {
    const query = `
      SELECT 
        pd.id_detalle AS id,
        pd.id_pedido,
        pd.id_producto,
        pd.cantidad,
        pd.subtotal,
        p.nombre AS producto_nombre,
        p.precio AS producto_precio,
        p.imagen_url AS producto_imagen
      FROM pedido_detalle pd
      JOIN productos p ON pd.id_producto = p.id_producto
      WHERE pd.id_pedido = ?
    `;
    db.query(query, [id_pedido], callback);
  }

  static create(detalleData, callback) {
    const { id_pedido, id_producto, cantidad, subtotal } = detalleData;
    const query = 'INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)';
    db.query(query, [id_pedido, id_producto, cantidad, subtotal], (err, results) => {
      if (err) {
        callback(err, results);
      } else {
        // Update pedido total
        const updateQuery = `
          UPDATE pedidos 
          SET total = (
            SELECT SUM(subtotal) 
            FROM pedido_detalle 
            WHERE id_pedido = ?
          ) 
          WHERE id_pedido = ?
        `;
        db.query(updateQuery, [id_pedido, id_pedido], (err2) => {
          if (err2) console.error('Error updating total:', err2);
        });
        callback(err, results);
      }
    });
  }

  static update(id, detalleData, callback) {
    const { cantidad, subtotal } = detalleData;
    const query = 'UPDATE pedido_detalle SET cantidad = ?, subtotal = ? WHERE id_detalle = ?';
    db.query(query, [cantidad, subtotal, id], (err, results) => {
      if (err) {
        callback(err, results);
      } else {
        // Get pedido_id and update total
        const getQuery = 'SELECT id_pedido FROM pedido_detalle WHERE id_detalle = ?';
        db.query(getQuery, [id], (err2, results2) => {
          if (!err2 && results2.length > 0) {
            const id_pedido = results2[0].id_pedido;
            const updateQuery = `
              UPDATE pedidos 
              SET total = (
                SELECT SUM(subtotal) 
                FROM pedido_detalle 
                WHERE id_pedido = ?
              ) 
              WHERE id_pedido = ?
            `;
            db.query(updateQuery, [id_pedido, id_pedido], (err3) => {
              if (err3) console.error('Error updating total:', err3);
            });
          }
        });
        callback(err, results);
      }
    });
  }

  static delete(id, callback) {
    // First get the pedido_id
    const getQuery = 'SELECT id_pedido FROM pedido_detalle WHERE id_detalle = ?';
    db.query(getQuery, [id], (err, results) => {
      if (err) {
        callback(err, results);
      } else if (results.length === 0) {
        callback(err, results);
      } else {
        const id_pedido = results[0].id_pedido;
        
        // Delete the detail
        const deleteQuery = 'DELETE FROM pedido_detalle WHERE id_detalle = ?';
        db.query(deleteQuery, [id], (err2, results2) => {
          if (err2) {
            callback(err2, results2);
          } else {
            // Update pedido total
            const updateQuery = `
              UPDATE pedidos 
              SET total = (
                SELECT COALESCE(SUM(subtotal), 0)
                FROM pedido_detalle 
                WHERE id_pedido = ?
              ) 
              WHERE id_pedido = ?
            `;
            db.query(updateQuery, [id_pedido, id_pedido], (err3) => {
              if (err3) console.error('Error updating total:', err3);
            });
            callback(err2, results2);
          }
        });
      }
    });
  }
}

module.exports = PedidoDetalle;
