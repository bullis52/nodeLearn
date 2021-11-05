const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleWare, userMiddleWare} = require('../middlewares');
const {ADMIN, USER} = require("../configs/user-roles.enum");

router.post(
    '/',
    userMiddleWare.isUserPresent,
    userMiddleWare.checkUserRole([
        ADMIN,
        USER
    ]),
    authMiddleWare.isPasswordMathed,
    authController.login
);
router.post('/logout', authController.logout);


module.exports = router;
