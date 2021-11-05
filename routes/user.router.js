const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleWare} = require('../middlewares');


router.get('/', userController.getUsers);

router.get('/:user_id', userController.getUsersById);

router.post('/',userMiddleWare.isUserBodyValid,userMiddleWare.createUserMiddleware,userController.createUser);

router.put('/',userController.updateUser);

module.exports = router;
