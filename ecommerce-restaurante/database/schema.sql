CREATE DATABASE IF NOT EXISTS lodeliodb;
USE lodeliodb;

-- Tabla: categorias
CREATE TABLE categorias (
    id_categoria INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla: productos
CREATE TABLE productos (
    id_producto INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(255),
    id_categoria INT(11),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- Tabla: mesas
CREATE TABLE mesas (
    id_mesa INT(11) AUTO_INCREMENT PRIMARY KEY,
    num_personas INT(11) NOT NULL,
    estado ENUM('Disponible', 'Ocupada', 'Reservada') DEFAULT 'Disponible'
);

-- Tabla: usuarios
CREATE TABLE usuarios (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    dni INT(8) UNIQUE,
    rol VARCHAR(30) NOT NULL
);

-- Tabla: pedidos
CREATE TABLE pedidos (
    id_pedido INT(11) AUTO_INCREMENT PRIMARY KEY,
    id_mesa INT(11),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) DEFAULT 0.00,
    estado ENUM('Pendiente', 'Completado', 'Cancelado') DEFAULT 'Pendiente',
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- Tabla: pedido_detalle
CREATE TABLE pedido_detalle (
    id_detalle INT(11) AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT(11),
    id_producto INT(11),
    cantidad INT(11) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- Insertar datos de ejemplo
INSERT INTO categorias (nombre, descripcion) VALUES
('Rabas y Aperitivos', 'Deliciosos aperitivos con rabas y calamar'),
('Platos de Calamar', 'Platos principales especializados en calamar'),
('Postres Marinos', 'Postres con inspiración marina'),
('Bebidas Refrescantes', 'Bebidas frescas para acompañar');

INSERT INTO productos (nombre, descripcion, precio, imagen_url, id_categoria) VALUES
('Rabas Fritas', 'Rabas crujientes y deliciosas', 15.99, '/images/Quesadillas-de-Huitlacoche.png', 1),
('Calamar a la Romana', 'Calamar rebozado y frito', 12.99, '/images/Enchiladas-Verdes.png', 1),
('Ensalada de Calamar', 'Calamar fresco con verduras', 10.99, '/images/Esquites-Modernos.png', 1),
('Pulpo al Ajillo', 'Pulpo con ajo y aceite de oliva', 14.99, '/images/Cochinita-Pibil.png', 1),
('Paella de Calamar', 'Paella tradicional con calamar', 18.99, '/images/Tacos-al-Pastor.png', 2),
('Calamar en su Tinta', 'Calamar cocinado en su propia tinta', 16.99, '/images/Agua-Jamaica-Y-Horchata.png', 2),
('Guiso de Calamar', 'Calamar guisado con verduras', 17.99, '/images/Gemini_Generated_Image_2b6hmt2b6hmt2b6h.png', 2),
('Calamar Gigante', 'Porción grande de calamar fresco', 20.99, '/images/Gemini_Generated_Image_c7zornc7zornc7zo.png', 2),
('Tiramisú de Mariscos', 'Postre con mariscos', 8.99, '/images/Gemini_Generated_Image_c7zornc7zornc7zo (1).png', 3),
('Helado de Vainilla con Caramelo', 'Helado cremoso', 6.99, '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png', 3),
('Frutas Frescas', 'Selección de frutas de temporada', 5.99, '/images/tacoBebidaFelices.png', 3),
('Flan de Coco', 'Flan con sabor a coco', 7.99, '/images/Logo.png', 3),
('Agua Marina', 'Agua mineral natural', 2.99, '/images/facebook.png', 4),
('Limonada Fresca', 'Limonada hecha en casa', 3.99, '/images/instagram.png', 4),
('Cóctel de Mariscos', 'Cóctel refrescante', 4.99, '/images/whatsapp.png', 4),
('Té Helado', 'Té helado natural', 3.49, '/images/telefono.png', 4);

INSERT INTO usuarios (nombre, apellido, password, dni, rol) VALUES
('Admin', 'User', 'admin123', 12345678, 'admin'),
('Juan', 'Perez', 'user123', 87654321, 'user');
