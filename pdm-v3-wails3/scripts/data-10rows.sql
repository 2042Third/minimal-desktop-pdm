DROP TABLE IF EXISTS myTable;

CREATE TABLE myTable (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT DEFAULT NULL,
     phone TEXT DEFAULT NULL,
     email TEXT DEFAULT NULL,
     region TEXT DEFAULT NULL,
     postalZip TEXT DEFAULT NULL,
     numberrange INTEGER DEFAULT NULL,
     country TEXT DEFAULT NULL,
     address TEXT DEFAULT NULL
);

INSERT INTO myTable (name,phone,email,region,postalZip,numberrange,country,address)
VALUES
  ("Shaeleigh Stewart","1-218-735-3472","montes.nascetur.ridiculus@protonmail.couk","Vestland","A9E 6M8",7,"Colombia","679-1139 Velit St."),
  ("Tucker Barlow","(953) 925-5465","lobortis.mauris@aol.edu","Zuid Holland","337637",2,"India","Ap #606-1382 Adipiscing, Rd."),
  ("Karleigh Bailey","1-417-735-9797","ante.iaculis.nec@yahoo.ca","East Region","42646",6,"Mexico","Ap #458-7649 Quam Ave"),
  ("Colton Maldonado","(258) 535-2391","magna.suspendisse@aol.org","Kaliningrad Oblast","5757",4,"United Kingdom","529-5605 Ut Road"),
  ("Sade Noel","(710) 643-6288","vulputate.nisi@yahoo.net","Tyrol","943431",4,"Ukraine","Ap #382-5408 Libero. Rd."),
  ("Angelica Price","1-474-808-6714","nibh.quisque@aol.net","Central Kalimantan","11187",3,"Austria","Ap #966-6087 Erat Rd."),
  ("Quon Hill","1-662-434-5348","nec.euismod@hotmail.com","Chihuahua","86843",8,"Italy","529-5647 Mollis Road"),
  ("Clayton Evans","(635) 775-2781","fringilla@icloud.edu","Tasmania","66668-527",2,"China","7678 Ipsum Road"),
  ("Kaseem Zamora","(368) 226-1883","sed.dolor@outlook.com","Herefordshire","62475",5,"Netherlands","Ap #845-5201 Dictum Av."),
  ("Zena Fowler","1-135-771-1831","magnis.dis@icloud.couk","Pará","12772",0,"India","4027 Non Av.");
