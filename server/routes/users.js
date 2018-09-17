const router = require('express').Router();
const { create,login,findAll } = require('../controllers/userController');

router.post('/register', create);
router.post('/login', login);
router.get('/', findAll);



module.exports = router;