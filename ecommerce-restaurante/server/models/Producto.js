const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lodeliodb'
});

class Producto {
  static getAll(callback) {
    const query = `
      SELECT 
        p.id_producto AS id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.imagen_url AS imagen,
        c.nombre AS categoria,
        p.id_categoria
      FROM productos AS p
      JOIN categorias AS c ON p.id_categoria = c.id_categoria
    `;
    db.query(query, callback);
  }

  static getById(id, callback) {
    const query = `
      SELECT 
        p.id_producto AS id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.imagen_url AS imagen,
        c.nombre AS categoria,
        p.id_categoria
      FROM productos AS p
      JOIN categorias AS c ON p.id_categoria = c.id_categoria
      WHERE p.id_producto = ?
    `;
    db.query(query, [id], callback);
  }

  static getByCategory(id_categoria, callback) {
    const query = `
      SELECT 
        p.id_producto AS id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.imagen_url AS imagen,
        c.nombre AS categoria
      FROM productos AS p
      JOIN categorias AS c ON p.id_categoria = c.id_categoria
      WHERE p.id_categoria = ?
    `;
    db.query(query, [id_categoria], callback);
  }

  static create(productoData, callback) {
    const { nombre, descripcion, precio, imagen_url, id_categoria } = productoData;
    const query = 'INSERT INTO productos (nombre, descripcion, precio, imagen_url, id_categoria) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, imagen_url, id_categoria], callback);
  }

  static update(id, productoData, callback) {
    const { nombre, descripcion, precio, imagen_url, id_categoria } = productoData;
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen_url = ?, id_categoria = ? WHERE id_producto = ?';
    db.query(query, [nombre, descripcion, precio, imagen_url, id_categoria, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM productos WHERE id_producto = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Producto;
