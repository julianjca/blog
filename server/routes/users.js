const router = require('express').Router();
const { create,login,findAll,remove,update } = require('../controllers/userController');

router.post('/register', create);
router.post('/login', login);
router.get('/', findAll);
router.delete('/:id', remove);
router.put('/:id', update);





module.exports = router;