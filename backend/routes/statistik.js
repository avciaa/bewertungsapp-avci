
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Evaluation, Project, Criterion } = db;
const { fn, col } = require('sequelize');

// GET: Durchschnittspunktzahl je Projekt und Kriterium
router.get('/projekte/durchschnitt', async (req, res) => {
  try {
    const ergebnis = await Evaluation.findAll({
      attributes: [
        'projectId',
        'criterionId',
        [fn('AVG', col('score')), 'durchschnittspunktzahl']
      ],
      include: [
        {
          model: Project,
          attributes: ['titel']
        },
        {
          model: Criterion,
          attributes: ['name']
        }
      ],
      group: [
        'Evaluation.projectId',
        'Evaluation.criterionId',
        'Project.id',
        'Criterion.id'
      ],
      order: [
        ['projectId', 'ASC'],
        ['criterionId', 'ASC']
      ]
    });

    res.json(ergebnis);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Durchschnittswerte konnten nicht berechnet werden'
    });
  }
});

module.exports = router;
