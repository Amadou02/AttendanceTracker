const express = require('express');

const router = express.Router();


router.get('/:id', async (req, res) => {
    // TODO fetch student and send res
});
router.get('/', async (req, res) => {
  // TODO fetch all students and send res
});
router.post('/', async (req, res) => {
  // TODO create new and send res
});
router.patch('/', async (req, res) => {
  // TODO update existing student and send res
});
router.delete('/', async (req, res) => {
  // TODO delete student and send res
});
