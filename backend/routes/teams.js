
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Team, Project, Member } = db;

// GET: alle Teams anzeigen
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Teams konnten nicht geladen werden' });
  }
});

// GET: ein Team anhand seiner ID anzeigen
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [Project, Member]
    });

    if (!team) {
      return res.status(404).json({ error: 'Team nicht gefunden' });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Team konnte nicht geladen werden' });
  }
});

// POST: neues Team erstellen
router.post('/', async (req, res) => {
  try {
    const { name, klasse } = req.body;

    if (!name || !klasse) {
      return res.status(400).json({
        error: 'name und klasse sind Pflichtfelder'
      });
    }

    const team = await Team.create({ name, klasse });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Team konnte nicht erstellt werden' });
  }
});

// PUT: Team aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team nicht gefunden' });
    }

    const { name, klasse } = req.body;

    if (!name || !klasse) {
      return res.status(400).json({
        error: 'name und klasse sind Pflichtfelder'
      });
    }

    await team.update({ name, klasse });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Team konnte nicht aktualisiert werden' });
  }
});

// DELETE: Team löschen
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team nicht gefunden' });
    }

    await team.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: 'Team konnte nicht gelöscht werden'
    });
  }
});

module.exports = router;
