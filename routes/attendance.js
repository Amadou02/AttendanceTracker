const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:id', async function (req, res) {
  res.status(200).json({});
});

router.get('/', function (req, res) {
  try {
  } catch (error) {}
});

router.post('/', function (req, res) {
  res.status(200).json({});
});

router.patch('/:id', function (req, res) {
  res.status(200).json({});
});

router.delete('/:id', function (req, res) {
  res.status(200).json({});
});

module.exports = router;
