const router = require('express').Router();
const { create,login,findAll,remove } = require('../controllers/userController');

router.post('/register', create);
router.post('/login', login);
router.get('/', findAll);
router.delete('/:id', remove);




module.exports = router;