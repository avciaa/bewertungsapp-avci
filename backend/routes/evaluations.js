const express = require('express');
const router = express.Router();
const db = require('../models');
const { Evaluation, Project, Criterion, Juror } = db;

// POST: neue Bewertung erstellen
router.post('/', async (req, res) => {
  try {
    const {
      projectId,
      criterionId,
      jurorId,
      score,
      comment
    } = req.body;

    // Pflichtfelder prüfen
    if (
      projectId == null ||
      criterionId == null ||
      jurorId == null ||
      score == null ||
      comment == null ||
      comment === ''
    ) {
      return res.status(400).json({
        error: 'projectId, criterionId, jurorId, score und comment sind Pflichtfelder'
      });
    }

    // Punktzahl muss eine gültige Zahl sein
    if (!Number.isInteger(Number(score)) || Number(score) < 0) {
      return res.status(400).json({
        error: 'score muss eine nicht-negative ganze Zahl sein'
      });
    }

    // Prüfen, ob Projekt, Kriterium und Juror existieren
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Projekt nicht gefunden' });
    }

    const criterion = await Criterion.findByPk(criterionId);
    if (!criterion) {
      return res.status(404).json({ error: 'Kriterium nicht gefunden' });
    }

    const juror = await Juror.findByPk(jurorId);
    if (!juror) {
      return res.status(404).json({ error: 'Juror nicht gefunden' });
    }

    // Prüfen, ob diese Kombination schon bewertet wurde
    const existingEvaluation = await Evaluation.findOne({
      where: { projectId, criterionId, jurorId }
    });

    if (existingEvaluation) {
      return res.status(409).json({
        error: 'Dieses Projekt wurde von diesem Juror für dieses Kriterium bereits bewertet'
      });
    }

    const evaluation = await Evaluation.create({
      projectId,
      criterionId,
      jurorId,
      score: Number(score),
      comment
    });

    res.status(201).json(evaluation);
  } catch (error) {
    // Datenbank-Unique-Constraint als zusätzliche Absicherung
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Diese Bewertung existiert bereits'
      });
    }

    console.error(error);
    res.status(500).json({
      error: 'Bewertung konnte nicht gespeichert werden'
    });
  }
});

module.exports = router;
