const router = require('express').Router();

const cards = require('./cards');

router.use('/cards', cards);

module.exports = router;