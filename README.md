# Bewertungsapp – Afra Avci

Klasse: 4aAPC

## Setup

Backend:
```
cd backend
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

Frontend:
```
cd frontend
npm install
ionic serve
```

Eigene `config/config.json` lokal aus `config/config.example.json` ableiten, nicht committen.

## Einheit 1: Installation

- [x] Screenshot Toolchain (`node --version`, `ionic --version`, laufendes DB-Tool bzw. Docker-Container)
- [x] Antworten auf die vier Verständnisfragen: `docs/screenshots/einheit1-fragen.md`

## Einheit 2: Datenmodell anlegen

- [x] Ausgefüllte Planungsvorlage: `docs/diagramm/planungsvorlage.html`
- [x] Verwendete `model:generate`-Befehle dokumentiert
- [x] Screenshot der angelegten Tabellen im DB-Tool: `docs/screenshots/`

## Einheit 3: Assoziationen und weitere Modelle

- [x] Alle Modelle (Team, Member, Project, Criterion, Juror, Evaluation) mit ausgefüllten `associate`-Methoden
- [x] Unique-Constraint auf (projectId, criterionId, jurorId) bei Evaluation
- [x] Mindestens ein Seeder mit Testdaten

## Einheit 4: Backend-Routen

- [x] CRUD für Team und Project
- [x] POST-Route für Evaluation inkl. Validierung
- [x] Aggregations-Route: Durchschnitt der Punktzahl pro Projekt und Kriterium
- [x] Kurze Endpunkt-Dokumentation (Methode, Pfad, Body, Rückgabe) unten in diesem README oder in `docs/`

## Einheit 5: Postman-Test

- [ ] Collection: `docs/postman/bewertungsapp.postman_collection.json`
- [ ] Environment: `docs/postman/bewertungsapp.postman_environment.json`
- [ ] Mindestens zwei dokumentierte Negativtests
- [ ] Testbericht: `docs/postman/testbericht.md`

## Einheit 6: IONIC-Frontend

- [ ] Projektliste mit Team-Zuordnung
- [ ] Detailansicht eines Projekts mit bisherigen Bewertungen
- [ ] API-Service vollständig an eigenes Backend angebunden

## Einheit 7: Login und Endabgabe

- [ ] Bewertungsformular (Projekt, Kriterium, Punktzahl, Kommentar) mit Validierung
- [ ] Auswertungsseite mit Durchschnittswerten
- [ ] Juror-Login, Token-Storage mit `@capacitor/preferences`
- [ ] Nachweis: geschützte Route liefert ohne Token 401, mit gültigem Token die erwartete Antwort

## Endpunkt-Dokumentation (laufend ergänzen)

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| GET | /teams | – | Liste aller Teams |

## Bekannte Einschränkungen

<hier eintragen, was noch fehlt oder bekannt fehlerhaft ist>

## Einheit 4: Backend-Routen (kurz doku)

### Teams

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| GET | `/teams` | – | Liste aller Teams |
| GET | `/teams/:id` | – | Team mit Projekten und Mitgliedern |
| POST | `/teams` | `{"name":"Team Blockchain","klasse":"4ITL"}` | `201 Created`: erstelltes Team |
| PUT | `/teams/:id` | `{"name":"Team Blockchain","klasse":"4ITL"}` | `200 OK`: aktualisiertes Team |
| DELETE | `/teams/:id` | – | `204 No Content` |

### Projekte

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| GET | `/projects` | – | Liste aller Projekte inklusive Team |
| GET | `/projects/:id` | – | Projekt inklusive Team |
| POST | `/projects` | `{"teamId":1,"titel":"Bewertungsapp","beschreibung":"Projektbeschreibung","praesentiertAm":"2026-06-12"}` | `201 Created`: erstelltes Projekt |
| PUT | `/projects/:id` | Dieselben Felder wie bei POST | `200 OK`: aktualisiertes Projekt |
| DELETE | `/projects/:id` | – | `204 No Content` |

### Bewertungen

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| POST | `/evaluations` | `{"projectId":1,"criterionId":1,"jurorId":1,"score":8,"comment":"Gute Umsetzung des Projekts"}` | `201 Created`: gespeicherte Bewertung |

Die Bewertungsroute prüft Pflichtfelder, die Punktzahl, die Existenz von Projekt, Kriterium und Juror sowie doppelte Bewertungen. Fehler werden mit passenden HTTP-Statuscodes zurückgegeben, z. B. `400`, `404` oder `409`.

### Statistik

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| GET | `/statistik/projekte/durchschnitt` | – | Durchschnittliche Punktzahl je Projekt und Kriterium, inklusive Projekt- und Kriterienname |

### API-Status

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| GET | `/` | – | `200 OK`: Statusmeldung, dass die API läuft |

**Basis-URL:** `http://localhost:3000`


