const {passwordService, jwtService} = require('../service');
const {AUTHORIZATION} = require("../configs/constans");
const ErrorHandler = require("../errors/ErrorHandler");
const O_Auth = require('../dataBase/O_auth');
const tokenTypeEnum = require('../configs/token-type.enum');

module.exports = {
    isPasswordMathed: async (req, res, next) => {

        try {

            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }

    },
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({access_token: token}).populate('user_id');

            if (!tokenResponse){
                throw new ErrorHandler('Invalid token', 401);
            }

            req.user = tokenResponse.user_id;

            next();

        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token,tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token})
                .populate('user_id');

            if (!tokenResponse){
                throw new ErrorHandler('Invalid token', 401);
            }

            await O_Auth.remove({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();

        } catch (e) {
            next(e);
        }
    }
};
