const express = require('express');
const router = express.Router();

const { Student } = require('../models');
/**
 * Récupère un étudiant existant dans la base de données.
 * TODO: à refactoriser pour externaliser le cb dans un ctrl dédié.
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Récupère tous les étudiant existant dans la base de données et le nombre d'enregistrement.
 * TODO: à refactoriser pour externaliser le cb dans un ctrl dédié.
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAndCountAll({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post('/', async (req, res) => {
  try {
    const student = await Student.create({ ...req.body });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Modifie un étudiant existant dans la base de données.
 * TODO: à refactoriser pour externaliser le cb dans un ctrl dédié.
 */
router.patch('/:id', async (req, res) => {
  try {
    const updatedStudents = await Student.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedStudents[0] === 0) {
      throw {
        status: 404,
        message: 'No student found for the entered ID!',
      };
    }
    res.status(200).json({
      message: 'Student updated successfully!',
    });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

/**
 * Supprime un utilisateur existant dans la base de données
 * TODO: à refactoriser pour externaliser le cb dans un ctrl dédié.
 */
router.delete('/:id', async (req, res) => {
  try {
    const destroyedStudents = await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (destroyedStudents === 0) {
      throw {
        status: 404,
        message: 'No student found for the entered ID!',
      };
    }
    res.status(200).json({ message: 'student deleted successfully!' });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

module.exports = router;
