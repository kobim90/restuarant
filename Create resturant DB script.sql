CREATE DATABASE `restaurant_db`;

CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `orderDate` date NOT NULL,
  `orderCity` varchar(40) NOT NULL,
  `orderAddress` varchar(200) NOT NULL,
  PRIMARY KEY (`orderId`)
);

CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(40) NOT NULL,
  `unitPrice` float NOT NULL,
  PRIMARY KEY (`productId`)
);

CREATE TABLE `order_details` (
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`orderId`,`productId`),
  KEY `FK_orderId` (`orderId`),
  KEY `FK_productId` (`productId`),
  CONSTRAINT `FK_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `FK_productId` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ;

insert into products (productName, unitPrice)
values ("chips", 10),
	("shnitzel", 15),
    ("kabab", 10),
    ("tofu", 5),
    ("shwarma", 20);