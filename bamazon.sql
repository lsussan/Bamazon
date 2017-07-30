DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	`item_id` INTEGER(11) AUTO_INCREMENT NOT NULL,
    `product_name` VARCHAR(100) NOT NULL,
    `department_name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `stock_quantity` INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
    
);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
	  VALUES('turntable', 'electronics', 199.99, 10),
			('Air Force Ones', 'shoes', 129.99, 25),
			('iphone charger', 'electronics', 9.99, 100),
			('Magic Johnson Autographed Basketball', 'memorabilia', 999.99, 2),
			('Arcade Fire Funeral LP', 'music', 29.99, 50);
            
 
