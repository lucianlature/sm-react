const router = require('express').Router();
const CardController = require('../../controllers/CardController');

router.get('/:id', CardController.findById);
router.put('/:id', CardController.update);
router.delete('/:id', CardController.drop);
router.post('/:id/addColor', CardController.addColor);
router.post('/:id/removeColor', CardController.removeColor);
router.post('/move', CardController.move);

module.exports = router;