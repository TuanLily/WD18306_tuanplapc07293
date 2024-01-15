"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../controller/indexController');



router.get('/', controller.showHomePage);

router.get('/signin', (req, res) => {
    res.render('partials/signIn', { isHomePage: false, isSignInPage: true, isSignUpPage: false });
});
router.get('/signup', (req, res) => {
    res.render('partials/signUp', { isHomePage: false, isSignInPage: false, isSignUpPage: true });
});


router.get('/:page', controller.showMorePage);

router.get('/404', controller.show404Page);


module.exports = router;
