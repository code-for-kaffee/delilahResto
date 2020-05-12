CREATE TABLE delilahresto.`orderproducts` (
  `orders_products_id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`orders_products_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
)

CREATE TABLE delilahresto.`orders` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `status` enum('PENDING','CANCELLED','SENDING','RECEIVED') NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order__id_UNIQUE` (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
)

CREATE TABLE delilahresto.`products` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `nick` varchar(45) NOT NULL,
  `description` varchar(240) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `id_UNIQUE` (`product_id`)
)

CREATE TABLE delilahresto.`users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` int NOT NULL,
  `address` varchar(45) NOT NULL,
  `is_admin` tinyint NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id_UNIQUE` (`user_id`)
)