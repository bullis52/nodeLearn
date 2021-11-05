const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const ErrorHandler = require("../errors/ErrorHandler");


module.exports = {
    createUserMiddleware: async (req, res, next) => {

        try {
            const userByEmail = await User.findOne({email: req.body.email});
            if (userByEmail) {
                throw new ErrorHandler('email arledy exist',404);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }

    },

    isUserBodyValid: (req, res, next) => {

        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }

    },

    isUserPresent: async (req, res, next) => {

        try {
            const userByEmail = await User
                .findOne({email: req.body.email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler('wrong email or password',418);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }

    },

    checkUserRole: (roleARR = []) => (req,res,next)=>{
        try {
            const {role} = req.user;

            if (!roleARR.includes(role)){
                throw new Error('access denied');
            }

            next();

        }catch (e) {
            next(e);
        }
    },

};
