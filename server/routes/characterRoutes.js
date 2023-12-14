const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router();

router.get('/character', characterController.getCharacter);
router.post('/levelup', characterController.levelUpCharacter);
router.delete('/leveldown', characterController.levelDownCharacter);

module.exports = router;