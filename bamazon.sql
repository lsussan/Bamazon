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
			('Arcade Fire Funeral LP', 'music', 29.99, 50),
            ('Liverpool Soccer Kit', 'sporting goods', 119.95, 25),
            ('Dodgers Jersey', 'sporting goods', 125.99, 20),
            ('Apple Iphone 6s', 'electronics', 399.95, 50),
            ('10 pack batteries AA', 'electronics', 5.99, 55),
            ('Playstation 4 Console', 'electronics', 499.99, 10);
            
 select * from products;
 
 
#DELETE from products 
#WHERE item_id = 10;		
select * from products;    
