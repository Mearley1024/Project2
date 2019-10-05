-- DROP DATABASE IF EXISTS plants_db;
-- CREATE DATABASE plants_db;

-- DROP DATABASE IF EXISTS testdb;
-- CREATE DATABASE testdb;

-- USE plants_db;

-- CREATE TABLE Plant(
--     id INT AUTO_INCREMENT NOT NULL,
--     plantName VARCHAR(25) NOT NULL,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE User(
--     id INT AUTO_INCREMENT NOT NULL,
--     userName VARCHAR(25) NOT NULL,
--     userPass VARCHAR(8) NOT NULL,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     PRIMARY KEY (id)
-- );

-- INSERT INTO Plant(plantName) VALUES ('testing');
DROP DATABASE IF EXISTS plants_db;
CREATE DATABASE plants_db;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;


CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

CREATE TABLE TestTable AS
SELECT customername, contactname
FROM customers;

CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (ID)
);

CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    CONSTRAINT PK_Person PRIMARY KEY (ID,LastName)
);

