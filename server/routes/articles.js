const router = require('express').Router();
const { create,findAll,remove,update } = require('../controllers/articleController');
const { auth } = require('../middlewares/auth');

router.post('/', auth, create);
router.get('/', findAll);
router.delete('/:id',auth, remove);
router.put('/:id', auth, update);

module.exports = router;