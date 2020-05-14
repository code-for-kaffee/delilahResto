CREATE TABLE `clients` (
  `username` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci UNIQUE NOT NULL,
  `fullname` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT UNIQUE NULL,
  `phone` int(64) DEFAULT UNIQUE NULL,
  `address` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `user_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT
)

CREATE TABLE `orderproducts` (
  `order_product_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL KEY,
  `product_id` int(11) NOT NULL KEY
   CONSTRAINT `orderproducts_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
   CONSTRAINT `orderproducts_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
)


CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `order_status` enum('new','confirm','preparing','send','delivered') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'new',
  `pay_method` enum('cash','credit') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'cash',
  `user_id` int(64) NOT NULL KEY
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `clients` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
)

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_name` varchar(24) COLLATE utf8_unicode_ci NOT NULL UNIQUE,
  `stock` int(10) NOT NULL,
  `product_price` int(4) NOT NULL
)





