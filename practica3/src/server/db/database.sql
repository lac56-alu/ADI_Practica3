BEGIN TRANSACTION;
DROP TABLE IF EXISTS "category";
CREATE TABLE IF NOT EXISTS "category" (
	"id"	INTEGER,
	"type"	TEXT,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "user";
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER,
	"userName"	TEXT,
	"name"	TEXT,
	"lastname"	TEXT,
	"password"	TEXT,
	"email"	TEXT,
	"city"	TEXT,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "place";
CREATE TABLE IF NOT EXISTS "place" (
	"id"	INTEGER,
	"name"	TEXT,
	"description"	TEXT,
	"city"	TEXT,
	"address"	TEXT,
	"user_id"	INTEGER,
	"category_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("category_id") REFERENCES "category"("id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id")
);
DROP TABLE IF EXISTS "comment";
CREATE TABLE IF NOT EXISTS "comment" (
	"id"	INTEGER,
	"tittle"	TEXT,
	"description"	TEXT,
	"user_id"	INTEGER,
	"place_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id"),
	FOREIGN KEY("place_id") REFERENCES "place"("id")
);
DROP TABLE IF EXISTS "plan";
CREATE TABLE IF NOT EXISTS "plan" (
	"id"	INTEGER,
	"name"	TEXT,
	"description"	TEXT,
	"user_id"	INTEGER,
	"place_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id"),
	FOREIGN KEY("place_id") REFERENCES "place"("id")
);
INSERT INTO "category" ("id","type") VALUES (0,'restauracion'),
 (1,'playas'),
 (2,'ocio nocturno'),
 (3,'monumentos'),
 (4,'iglesias');
INSERT INTO "user" ("id","userName","name","lastname","password","email","city") VALUES (0,'raaq02','Raquel','Martinez','hola','raq@ua.es','Elche'),
 (1,'luiz9','Luis','Alfonso','hola','luiz@ua.es','Catral'),
 (2,'soff','Sofia','Garcia','1234','sof@ua.es','Alicante'),
 (3,'lau04','Laura','Blasco','1234','lau@ua.es','Madrid');
INSERT INTO "place" ("id","name","description","city","address","user_id","category_id") VALUES (0,'Cala Bol Nou','Cala con buenas vistas','Villajoyosa','Calle Mar, 23',1,1),
 (1,'Yaho','Buen restaurante chino en el centro de la ciudad','ELche','La Glorieta, 30',0,0);
INSERT INTO "comment" ("id","tittle","description","user_id","place_id") VALUES (0,'Buen restaurante','Me parece un restaurante con muy buen servicio',2,0),
 (1,'Mal aparcamiento','Es muy dificil aparcar por los alrededores',3,1);
INSERT INTO "plan" ("id","name","description","user_id","place_id") VALUES (0,'Mañana por Elche','Si desea pasar una buena mañana por Elche recorriendo sus calles, luego puede comer en el chino que hay localizado en el centro, se llama Yaho y tiene muy buenos platos',2,1);
COMMIT;
