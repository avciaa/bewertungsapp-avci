### 1. Was ist der Unterschied zwischen Capacitor und Cordova?
Capacitor und Cordova ermöglichen es, Webanwendungen wie eine Ionic-App als native App für Android oder iOS auszuführen. 
Capacitor ist das modernere System von Ionic und ist stärker auf aktuelle Webtechnologien und eine einfache Verbindung zwischen Web-Code und nativen Funktionen ausgelegt. 
Cordova ist älter und verwendet dafür ein eigenes Plugin-System.


### 2. Was macht ein ORM wie Sequelize, und wofür braucht man zusätzlich die sequelize-cli?
Ein ORM wie Sequelize ermöglicht es, mit JavaScript bzw. TypeScript auf eine Datenbank zuzugreifen, ohne SQL für jede Datenbankoperation selbst schreiben zu müssen. 
Sequelize übernimmt dabei unter anderem die Verbindung zwischen Programmcode und Datenbanktabellen. Die sequelize-cli wird zusätzlich für Aufgaben wie das Erstellen von Datenbankmodellen, Migrationen und Seed-Daten über die Kommandozeile verwendet.


### 3. Was unterscheidet `npm install` von `npx` beim Ausführen eines Pakets?
Mit `npm install` wird ein Paket installiert und normalerweise als Abhängigkeit im Projekt gespeichert. `npx` dient dagegen hauptsächlich dazu, ein Paket bzw. dessen Kommando direkt auszuführen, ohne es vorher dauerhaft global installieren zu müssen. 
Dadurch kann man beispielsweise Kommandozeilenprogramme aus einem Projekt heraus verwenden.


### 4. Was ist REST, und warum passt das Konzept zu einer Client-Server-Architektur wie Ionic-App und Node-Backend?
REST ist ein Konzept für die Kommunikation zwischen verschiedenen Anwendungen über HTTP. Dabei stellt beispielsweise das Node-Backend Daten und Funktionen über verschiedene URLs zur Verfügung, während die Ionic-App diese über HTTP-Anfragen abruft oder verändert. Dadurch sind Frontend und Backend voneinander getrennt und können unabhängig voneinander entwickelt werden.
