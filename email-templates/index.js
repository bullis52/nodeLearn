const {WELCOME,ORDER_CONFIRMED,USER_BLOCKED} = require('../configs/email-action.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject:'welcome!!'
    },
    [ORDER_CONFIRMED]: {
        templateName: 'order',
        subject:'cool!'
    },
    [USER_BLOCKED]:{
        templateName: 'ban',
        subject:'fuck you!'
    }
}
;
