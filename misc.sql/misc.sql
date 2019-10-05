
DROP DATABASE IF EXISTS plants_db;
CREATE DATABASE plants_db;


CREATE TABLE Plants (
    PlantID int, AUTO INCREMENT NOT NULL,
    GeneralName varchar(255),
    LatinName varchar(255),
    Personality varchar(225),
    PRIMARY KEY (PlantID)
);

DROP DATABASE IF EXISTS users_db;
CREATE DATABASE user_db;

CREATE TABLE Users (
    UserID int, AUTO INCREMENT, NOT NULL
    ContactName varchar(255),
    Personality varchar(225),
    EmailName varchar (225),
    PRIMARY KEY (UserID)
)




CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    CONSTRAINT PK_Person PRIMARY KEY (ID,LastName)
);


