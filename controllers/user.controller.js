const User = require('../dataBase/User');
const passwordService = require('../service/passwoed.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        }catch (e){
            res.json(e);
        }
    },
    getUsersById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

            const userNormalize = userUtil.userNormalizator(user);

            res.json(userNormalize);
        }catch (e) {
            res.json(e.message);
        }
    },
    createUser:async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body,password:hashedPassword});

            res.json(newUser);

        }catch (e) {
            res.json(e);
        }
    },
    updateUser:(req, res) => {
        res.json('update user');
    }
};
