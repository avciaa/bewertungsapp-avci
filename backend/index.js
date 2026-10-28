
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./models');

const teamsRouter = require('./routes/teams');
const projectsRouter = require('./routes/projects');
const evaluationsRouter = require('./routes/evaluations');
const statistikRouter = require('./routes/statistik');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Test-Endpunkt
app.get('/', (req, res) => {
  res.json({ message: 'Bewertungsapp API läuft!' });
});

// Routen einbinden
app.use('/teams', teamsRouter);
app.use('/projects', projectsRouter);
app.use('/evaluations', evaluationsRouter);
app.use('/statistik', statistikRouter);

// Server starten, sobald die Datenbank erreichbar ist
db.sequelize.authenticate()
  .then(() => {
    console.log('Datenbankverbindung erfolgreich.');

    app.listen(PORT, () => {
      console.log(`Server läuft auf http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Datenbankverbindung fehlgeschlagen:', error);
  });
