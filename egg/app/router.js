'use strict';
module.exports = app => {
    const { router, controller } = app;
    router.post('/register', controller.api.user.register);
    router.post('/resetPassword', controller.api.user.resetPassword);
};
