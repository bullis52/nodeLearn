const User = require('../dataBase/User');
const {passwordService,emailService} = require('../service');
const userUtil = require('../util/user.util');
const {WELCOME} = require("../configs/email-action.enum");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUsersById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

            const userNormalize = userUtil.userNormalizator(user);

            res.json(userNormalize);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            await emailService.sendMail(req.body.email,WELCOME,{userName:req.body.name});

            res.json(newUser);

        } catch (e) {
            next(e);
        }
    },
    updateUser: (req, res) => {
        res.json('update user');
    },
    deleteAccount: (req,res,next) => {
        try {

            console.log(req.user);

            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
};
