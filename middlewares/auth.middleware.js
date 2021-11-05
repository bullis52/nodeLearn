const passwordService = require('../service/passwoed.service');

module.exports = {
    isPasswordMathed: async (req, res, next) => {

        try {

            const {password} = req.body;
            const {password:hashPassword} = req.user;

            await passwordService.compare(password,hashPassword);

            next();
        } catch (e) {
            next(e);
        }

    },
};
