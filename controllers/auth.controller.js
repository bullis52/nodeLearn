const User = require('../dataBase/User');
const {userNormalizator} = require("../util/user.util");
const {jwtService} = require('../service');
const O_Auth = require('../dataBase/O_auth');

module.exports = {
    login: async (req, res,next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user:userNormalized,
                ...tokenPair
            });
        }catch (e){
            next(e);
        }
    },
    logout: async (req, res,next) => {
        try {
            const users = await User.find();

            res.json(users);
        }catch (e){
            next(e);
        }
    },
};
