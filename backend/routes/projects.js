
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Project, Team } = db;

// GET: alle Projekte inklusive Team
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [Team]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Projekte konnten nicht geladen werden' });
  }
});

// GET: ein Projekt anhand der ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [Team]
    });

    if (!project) {
      return res.status(404).json({ error: 'Projekt nicht gefunden' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Projekt konnte nicht geladen werden' });
  }
});

// POST: neues Projekt erstellen
router.post('/', async (req, res) => {
  try {
    const { teamId, titel, beschreibung, praesentiertAm } = req.body;

    if (!teamId || !titel || !beschreibung || !praesentiertAm) {
      return res.status(400).json({
        error: 'teamId, titel, beschreibung und praesentiertAm sind Pflichtfelder'
      });
    }

    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team nicht gefunden' });
    }

    const project = await Project.create({
      teamId,
      titel,
      beschreibung,
      praesentiertAm
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Projekt konnte nicht erstellt werden' });
  }
});

// PUT: Projekt aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Projekt nicht gefunden' });
    }

    const { teamId, titel, beschreibung, praesentiertAm } = req.body;

    if (!teamId || !titel || !beschreibung || !praesentiertAm) {
      return res.status(400).json({
        error: 'teamId, titel, beschreibung und praesentiertAm sind Pflichtfelder'
      });
    }

    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team nicht gefunden' });
    }

    await project.update({
      teamId,
      titel,
      beschreibung,
      praesentiertAm
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Projekt konnte nicht aktualisiert werden' });
  }
});

// DELETE: Projekt löschen
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Projekt nicht gefunden' });
    }

    await project.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Projekt konnte nicht gelöscht werden' });
  }
});

module.exports = router;
